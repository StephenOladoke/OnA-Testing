window.onload = function () {
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const location1 = "lekki";
  document.getElementById(
    "dynamicLink1"
  ).href = `grid_gallery_2.html?location=${location1}`;

  // Set the href for the second link
  const location2 = "surulere";
  document.getElementById(
    "dynamicLink2"
  ).href = `grid_gallery_2.html?location=${location2}`;

  function showLoader() {
    document.getElementById("preloader").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("preloader").style.display = "none";
  }

  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  function showToast(message) {
    toastBootstrap.show();
    document.getElementById("toastText").textContent = message;
  }

  // Fetch single property data based on ID
  function fetchProperty(propertyId) {
    showLoader();

    fetch(
      `https://onabooking-api.onrender.com/api/v1/properties?_id=${propertyId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((propertyData) => {
        const data = propertyData?.data?.data[0];
        const BOOKED_STATUS = "booked";
        const LEKKI_APARTMENT = "lekki";

        document.getElementById("hotelPrice").textContent = `₦${data?.price}`;
        document.getElementById("description").textContent = data?.description;

        if (data.status === BOOKED_STATUS) {
          document.getElementById("hotelAddress").textContent = data?.address;
        }

        if (data?.location === LEKKI_APARTMENT) {
          document.getElementById("apartmentType").textContent =
            "Lekki Apartment";
          document.getElementById("laundry").textContent = "Laundry";
          document.getElementById("pool").textContent = "Out-door Pool";
        } else {
          document.getElementById("apartmentType").textContent =
            "Surulere Apartment";
        }

        // Set background image
        document.querySelector(
          ".parallax-window"
        ).style.backgroundImage = `url(${data?.images[0]?.imageUrl})`;

        displayImages(propertyData?.data?.data[0]);

        hideLoader();
      })
      .catch((error) => {
        // alert(error.message);
        showToast(error.message);
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function displayImages(data) {
    var slidesContainer = document.querySelector(".sp-slides");
    var thumbnailsContainer = document.querySelector(".sp-thumbnails");

    data?.images?.forEach(function (imageSrc) {
      var slide = document.createElement("div");
      slide.className = "sp-slide";
      var img = document.createElement("img");
      img.className = "sp-image";
      img.alt = "Image";
      img.src = imageSrc?.imageUrl;
      slide.appendChild(img);
      slidesContainer.appendChild(slide);

      var thumbnail = document.createElement("img");
      thumbnail.className = "sp-thumbnail";
      thumbnail.alt = "Image";
      thumbnail.src = imageSrc?.imageUrl;
      thumbnailsContainer.appendChild(thumbnail);
    });

    $(document).ready(function ($) {
      $("#Img_carousel").sliderPro({
        width: 960,
        height: 500,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: false,
        smallSize: 500,
        startSlide: 0,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: false,
      });
    });
  }

  // Get property ID from URL query parameter
  const propertyId = getQueryParam("id");

  // Fetch single property data
  fetchProperty(propertyId);
};
