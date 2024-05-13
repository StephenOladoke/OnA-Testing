const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("login_message");
const submitLoginButton = document.getElementById("login_submit");

const location1 = "lekki";
document.getElementById(
  "dynamicLink1"
).href = `grid_gallery_2.html?location=${location1}`;

// Set the href for the second link
const location2 = "surulere";
document.getElementById(
  "dynamicLink2"
).href = `grid_gallery_2.html?location=${location2}`;

function saveToken(token, expiresIn) {
  const expirationTime = Date.now() + expiresIn * 1000;
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', expirationTime);
}

function isTokenExpired () {
  const expirationTime = localStorage.getItem('expirationTime');
  if(!expirationTime) {
    return true;
  }
  return Date.now() > parseInt(expirationTime);
}

function removeToken () {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
}

if(isTokenExpired()) {
  removeToken();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  if (!isValidEmail(email)) {
    message.innerText = "Please enter a valid email address";
    return;
  }

  if (!isValidPassword(password)) {
    message.innerText =
      "Password must be at least 8 characters long and contain letters and numbers";
    return;
  }

  submitLoginButton.disabled = true;
  submitLoginButton.innerHTML = "Loading...";

  // Send login request to API
  try {
    const response = await fetch(
      "https://onabooking-api.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      alert("Login Successful");
      const data = await response.json();

      if (data?.data?.token) {
        const expiresIn = 172800;

        saveToken(data?.data?.token, expiresIn);
        // localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("userId", data?.data?.user?._id);

        window.location.reload();
      } else alert("Token not found in response. Please try again.");
    } else {
      const responseData = await response.json();

      if (responseData && responseData.message) alert(responseData.message);
      else alert("Login failed. Please try again.");
    }
  } catch (error) {
    alert(error.message);
    console.error("Error:", error);

    submitLoginButton.disabled = false;
    submitLoginButton.innerHTML = "Log In";
  }
});

//Validation functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
}

document.addEventListener("DOMContentLoaded", function () {
  const signInDisplay = document.getElementById("sign-in-display");

  const token = localStorage.getItem("token");

  if (token) {
    signInDisplay.style.display = "none";
  } else {
    signInDisplay.style.display = "block";
  }
});
