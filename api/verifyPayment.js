window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get("reference");

  const toastLiveExample = document.getElementById("paymentToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  function showToast(message) {
    toastBootstrap.show();
    document.getElementById("paymentToastText").textContent = message;
  }

  function queryPayment() {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("You are not logged in.");
      console.error("Token not found in localStorage");
      return;
    }

    fetch(
      `https://onabooking-api.onrender.com/api/v1/bookings/payment-verification/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        const res = response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          showToast(res?.message || "Booking made Successfully");
        }

        return response.json();
      })
      .catch((error) => {
        // alert("There was a problem with the fetch operation:", error.message);
        showToast(
          "There was a problem with the fetch operation:" + error.message
        );
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  queryPayment();
};
