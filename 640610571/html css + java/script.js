// function showMessage() {
//     const input = document.getElementById("userMessage").value; // รับค่าจากช่อง input
//     const display = document.getElementById("displayArea"); // อ้างถึงพื้นที่แสดงข้อความ
//     if (input.trim() === "") {
//       display.innerHTML = "กรุณาพิมพ์ข้อความก่อนนะครับ 😊"; // ถ้าไม่มีข้อความ
//     } else {
//       display.innerHTML = `คุณฝากข้อความว่า: <strong>${input}</strong>`; // แสดงข้อความที่พิมพ์
//     }
//   }

document.getElementById("themeToggleBtn").onclick = function () {
  document.body.classList.toggle("dark-mode");
  this.textContent = document.body.classList.contains("dark-mode")
    ? "โหมดสว่าง"
    : "โหมดมืด";
};

// พิมพ์แล้วแสดงทันที
let input = document.getElementById("userMessage");
let display = document.getElementById("displayArea");
let btn = document.getElementById("sendBtn");

input.addEventListener("input", function () {
  display.innerHTML = input.value
    ? `ข้อความ: <strong>${input.value}</strong>`
    : "กรุณาพิมพ์ข้อความก่อนนะครับ 😊";
});

// ปุ่มส่ง -> popup แจ้งเตือน + ล้างช่อง
btn.addEventListener("click", function () {
  alert(input.value ? "ส่งข้อความสำเร็จ!" : "กรุณาพิมพ์ข้อความก่อนส่ง");
  input.value = "";
  display.innerHTML = "กรุณาพิมพ์ข้อความก่อนนะครับ 😊";
});
