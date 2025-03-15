function validateInputForm(event) {
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordFormat = /([a-zA-Z0-9]{6,})/;

  if (emailInput.value.trim() === "" || !emailFormat.test(emailInput.value) || emailInput.value.length > 33) {
    alert("Enter correct email!");
    event.preventDefault();
    return false;
  }
  if (passwordInput.value.length < 6 || !passwordFormat.test(passwordInput.value) || passwordInput.value.length > 20) {
    alert("Enter correct password (minimum length 6)");
    event.preventDefault();
    return false;
  }
  return true;
}


if (typeof document !== "undefined") {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", validateInputForm);
  }
}

function validateInputFormForTest(email, password) { // created a similar function for testing, turned out hard to test the one where u choose variables from html
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordFormat = /([a-zA-Z0-9]{6,})/;

  if (email.trim() === "" || !emailFormat.test(email) || email.length > 33) {
    return false;
  }
  if (password.length < 6 || !passwordFormat.test(password) || password.length > 20) {
    return false;
  }
  return true;
}

module.exports = {
  validateInputFormForTest
}