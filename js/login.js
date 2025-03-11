function validateInputForm(event) {
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordFormat = /([a-zA-Z0-9]{6,})/;

  if (emailInput.value.trim() === "" || !emailFormat.test(emailInput.value)) {
    alert("please enter valid Email!");
    event.preventDefault();
    return false;
  }
  if (passwordInput.value.length < 6 || !passwordFormat.test(passwordInput.value)) {
    alert(`Enter Valid password(length min 6, only numbers and letters)`);
    event.preventDefault();
    return false;
  }
  return true;
}

const loginForm = document.querySelector("form");
if (loginForm) {
  loginForm.addEventListener("submit", validateInputForm);
}
