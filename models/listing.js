const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/a-mountain-goat-with-long-horns-standing-in-a-field--6UZhQ0m4gQ",
    set: (v) => v === "" ? 
    "https://unsplash.com/photos/a-mountain-goat-with-long-horns-standing-in-a-field--6UZhQ0m4gQ" 
    : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;