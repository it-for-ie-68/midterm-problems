const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const correctAnswer = "bonchon";

// ตรวจคำตอบเมื่อกดปุ่ม
checkBtn.addEventListener("click", checkAnswer);

// ตรวจคำตอบเมื่อกด Enter
answerInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (userAnswer === "") {
    result.innerText = "กรุณาพิมพ์คำตอบก่อนครับ";
    result.style.color = "orange";
  } else if (userAnswer === correctAnswer) {
    result.innerText = "คำตอบถูกต้อง! 👍";
    result.style.color = "green";
  } else {
    result.innerText = "คำตอบผิด ลองใหม่อีกครั้งครับ";
    result.style.color = "red";
  }
}
// โฟกัส input อัตโนมัติ
answerInput.focus();

// สุ่มคำ
function showMessage() {
  const texts = [
    "ร้านไก่เกาหลีเจ้าดัง",
    "คำตอบเป็นภาษาอังกฤษ(พิมพ์เล็ก!!)นะ",
    "มี 2 พยางค์",
    "มีข้อมูลอยู่ใน About Me",
  ];
  document.getElementById("message").innerText =
    texts[Math.floor(Math.random() * texts.length)];
}

function changeBackground() {
  // สุ่มสีพื้นหลัง
  const colors = ["#ffcccb", "#cce7ff", "#ccffcc", "#fff2cc", "#f5ccff"];
  document.body.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
}

// ฟังก์ชันสำหรับแสดง/ซ่อนข้อมูลส่วนตัว
function toggleAbout() {
  const about = document.getElementById("aboutMe");
  if (about.style.display === "none") {
    about.style.display = "block";
  } else {
    about.style.display = "none";
  }
}

// เริ่มนับเวลา
let seconds = 0;
const timerEl = document.getElementById("timer");

function updateTimer() {
  seconds++;
  timerEl.textContent = `${seconds} วินาที`;
}

setInterval(updateTimer, 1000);
