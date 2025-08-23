const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

if (nameInput) {
  nameInput.addEventListener("input", () => {
    greeting.textContent = nameInput.value
      ? `สวัสดีครับคุณ ${nameInput.value} ยินดีต้อนรับ!`
      : "";
  });
}

const colorBtn = document.getElementById("colorBtn");
if (colorBtn) {
  colorBtn.addEventListener("click", () => {
    document.body.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  });
}
