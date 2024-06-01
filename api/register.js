const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const submitButton = document.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const middleName = document.getElementById("middleName").value;
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const toastLiveExample = document.getElementById("registerToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  function showToast(message) {
    toastBootstrap.show();
    document.getElementById("registerToastText").textContent = message;
  }

  // const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
  // const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const isValidPhone = (phone) => /^\d{11}$/.test(phone);
  // const isValidPassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);

  // if (!isValidName(firstName) || !isValidName(lastName) || !isValidName(middleName)) {
  //   message.innerText = "Please enter valid names (alphabetic characters only)";
  //   return;
  // }

  // if (!isValidEmail(email)) {
  //   message.innerText = "Please enter a valid email address";
  //   return;
  // }

  // if (!isValidPhone(phoneNumber)) {
  //   message.innerText = "Please enter a valid phone number (11 digits)";
  //   return;
  // }

  // if (!isValidPassword(password)) {
  //   message.innerText = "Password must be at least 8 characters long and contain letters and numbers";
  //   return;
  // }

  // if (password !== confirmPassword) {
  //   message.innerText = "Passwords do not match";
  //   return;
  // }

  submitButton.disabled = true;
  submitButton.innerHTML = "Loading...";

  try {
    const response = await fetch("https://onabooking-api.onrender.com/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        middleName,
        userName,
        email,
        phoneNumber,
        password,
        role: "user",
      }),
    });

    if (response.ok) {
      showToast("Registration Successful, Please Login");
      message.innerHTML = "Registration Successful, Please Login";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 4000);
    } else {
      const responseData = await response.json();

      if (responseData && responseData.message) {
        showToast(responseData.message);
        message.innerText = responseData.message;
      } else {
        showToast("Registration failed. Please try again.");
        message.innerText = "Registration failed. Please try again.";
      }
    }
  } catch (error) {
    console.error("Error:", error);

    showToast("An error occurred. Please try again later");
    message.innerText = "An error occurred. Please try again later";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Create an account";
  }
});
