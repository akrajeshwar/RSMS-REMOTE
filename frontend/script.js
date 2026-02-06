console.log("hello")

const emailInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const form = document.getElementById("loginpage")

form.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent page from reloading

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("email:", email);
    console.log("password:", password);
});