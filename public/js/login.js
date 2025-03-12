function validateInputForm(event) {
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordFormat = /([a-zA-Z0-9]{6,})/;

  if (emailInput.value.trim() === "" || !emailFormat.test(emailInput.value)) {
    alert("Enter correct email!");
    event.preventDefault(); 
    return false;
  }
  if (passwordInput.value.length < 6 || !passwordFormat.test(passwordInput.value)) {
    alert("Enter correct password (minimum length 6)");
    event.preventDefault();
    return false;
  }
  return true;
}


const loginForm = document.querySelector("form");
if (loginForm) {
  loginForm.addEventListener("submit", validateInputForm);
}