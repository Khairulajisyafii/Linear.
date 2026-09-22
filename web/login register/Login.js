const authContainer = document.getElementById("authContainer");

const switchBtn = document.getElementById("switchBtn");

const welcomeTitle = document.getElementById("welcomeTitle");

const welcomeText = document.getElementById("welcomeText");

let registerMode = false;

switchBtn.addEventListener("click", () => {
  registerMode = !registerMode;

  authContainer.classList.toggle("register-active", registerMode);

  if (registerMode) {
    welcomeTitle.textContent = "Hello, Friend !";

    welcomeText.textContent =
      "Enter your personal details and start your journey with us.";

    switchBtn.textContent = "SIGN UP";
  } else {
    welcomeTitle.textContent = "Welcome Back !";

    welcomeText.textContent =
      "To keep connected with us please login with your personal info.";

    switchBtn.textContent = "SIGN IN";
  }
});
