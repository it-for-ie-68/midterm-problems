const username = document.getElementById("username");
const h2 = document.querySelector("h2");

console.log(username);

username.addEventListener("input", function(e) {
    const text = e.target.value;
  if (text === "") {
    h2.textContent = "Enter Your Name";
  } else {
    h2.textContent = "Hi " + e.target.value;
  }});
