mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 7,
});

const marker = new mapboxgl.Marker({color: "red"})
  .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.title}</h4><p>Exact Location is provided after Booking!<p>`).setMaxWidth("300px"))
  .addTo(map);