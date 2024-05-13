const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("propertyId");

backButton.addEventListener("click", () => {
  window.location.href = `single_hotel.html?id=${id}`;
});

const location1 = "lekki";
document.getElementById(
  "dynamicLink1"
).href = `grid_gallery_2.html?location=${location1}`;

// Set the href for the second link
const location2 = "surulere";
document.getElementById(
  "dynamicLink2"
).href = `grid_gallery_2.html?location=${location2}`;