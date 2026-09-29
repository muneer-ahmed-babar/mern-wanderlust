const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  if (!req.file) {
    req.flash("error", "Please upload an image!");
    return res.redirect("/listings/new");
  }

  let response = await geocodingClient
    .forwardGeocode({
      query: `${req.body.listing.location}, ${req.body.listing.country}`,
      limit: 1,
    })
    .send();

  if (response.body.features.length === 0) {
    req.flash("error", "Location not found, please enter a valid location!");
    return res.redirect("/listings/new");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };
  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // UPDATED: image na ho to crash se bachne ke liye check, warna originalImageUrl khali rahega
  let originalImageUrl = "";
  if (listing.image && listing.image.url) {
    originalImageUrl = listing.image.url.replace("/upload", "/upload/h_200,w_250");
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  // yeh update se pehle wala (purana) document return karta hai
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });

  if (req.file) {
    let oldFilename = listing.image && listing.image.filename;

    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();

    // nayi image save hone ke baad purani Cloudinary se delete
    if (oldFilename) {
      await cloudinary.uploader.destroy(oldFilename);
    }
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    req.flash("error", "Listing you tried to delete does not exist!");
    return res.redirect("/listings");
  }

  // listing ki image bhi Cloudinary se delete
  if (deletedListing.image && deletedListing.image.filename) {
    await cloudinary.uploader.destroy(deletedListing.image.filename);
  }

  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};