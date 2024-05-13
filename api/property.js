window.onload = function () {
  fetchData();
};

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("location");

function showLoader() {
  document.getElementById("preloader").style.display = "block";
}

function hideLoader() {
  document.getElementById("preloader").style.display = "none";
}

function fetchData() {
  showLoader();

  fetch(`https://onabooking-api.onrender.com/api/v1/properties`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayProperties(data);
      hideLoader();
    })
    .catch((error) => {
      alert(error.message);
      console.error("There was a problem with the fetch operation:", error);
    })
    .finally(() => {
      // setLoading(false);
    });
}

function displayProperties(data) {
  const propertyContainer = document.getElementById("propertyContainer");

  data?.data?.data?.forEach((item) => {
    const propertyElement = document.createElement("div");
    propertyElement.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
    propertyElement.setAttribute("data-wow-delay", "0.1s");

    const propertyContent = `
            <div class="tour_container h-100">
                <div class="img_container">
                    <a href="single_hotel.html?id=${item?._id}">
                      <img src="${item.images[0].imageUrl}" class="img-fluid" alt="${item.name}">
                    </a>
                </div>

                <div class="tour_title">
                  <h3><strong>OnA</strong> ${item?.location}</h3>
                  <div class="rating">
                      <i class="icon-smile voted"></i><i class="icon-smile voted"></i><i class="icon-smile voted"></i><i class="icon-smile voted"></i><i class="icon-smile"></i><small>(75)</small>
                  </div>
                  <div class="wishlist">
                      <a class="tooltip_flip tooltip-effect-1" href="single_hotel.html?id=${item?._id}">+<span class="tooltip-content-flip"><span class="tooltip-back">Book Now</span></span></a>
                  </div>
              </div>
                
            </div>
        `;

    propertyElement.innerHTML = propertyContent;
    propertyContainer.appendChild(propertyElement);
  });
}
