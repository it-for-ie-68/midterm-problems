// ===== ตั้งค่าพื้นฐาน =====
const STORAGE_KEY = "messages"; // เก็บเป็น array ของ object { text, timestamp }
const STORAGE_EXPIRED = "expiredMessages";
const THREE_MINUTES = 2 * 60 * 1000; //  นาที (มิลลิวินาที)
const EXPIRED_LIFETIME = 10 * 60 * 1000; // เก็บข้อความหมดอายุไว้อีก 10 นาที

let messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let expiredMessages = JSON.parse(localStorage.getItem(STORAGE_EXPIRED)) || [];

const messageBox = document.getElementById("messageBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// ===== แสดงข้อความทั้งหมด =====
function displayMessages() {
  messageBox.innerHTML = "";

  messages.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("user-message");
    msgDiv.textContent = msg.text;

    // นับถอยหลังของแต่ละข้อความ
    const countdownEl = document.createElement("span");
    countdownEl.style.marginLeft = "10px";
    countdownEl.style.fontSize = "0.9em";
    countdownEl.style.color = "gray";

    let remaining = THREE_MINUTES - (Date.now() - msg.timestamp);
    if (remaining <= 0) {
      countdownEl.textContent = "(หมดเวลา)";
    } else {
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      countdownEl.textContent = `(${minutes}:${seconds
        .toString()
        .padStart(2, "0")})`;
    }

    msgDiv.appendChild(countdownEl);
    messageBox.appendChild(msgDiv);
  });
}

// ===== บันทึกลง localStorage =====
function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  localStorage.setItem(STORAGE_EXPIRED, JSON.stringify(expiredMessages));
}

// ===== จัดการข้อความหมดอายุ =====
function checkExpiredMessages() {
  const now = Date.now();
  const stillActive = [];
  const stillExpired = [];

  // ย้ายจาก active → expired
  messages.forEach((msg) => {
    if (now - msg.timestamp >= THREE_MINUTES) {
      expiredMessages.push({ ...msg, expiredAt: now });
    } else {
      stillActive.push(msg);
    }
  });

  // ลบ expired ที่อยู่เกิน EXPIRED_LIFETIME 10 นาที
  expiredMessages.forEach((msg) => {
    if (now - msg.expiredAt < EXPIRED_LIFETIME) {
      stillExpired.push(msg);
    }
  });

  messages = stillActive;
  expiredMessages = stillExpired;
  saveMessages();
}

// ===== ย้ายข้อความที่หมดเวลาไปเก็บใน expiredMessages =====
function removeExpiredMessages() {
  const now = Date.now();
  const stillActive = [];
  messages.forEach((msg) => {
    if (now - msg.timestamp >= THREE_MINUTES) {
      expiredMessages.push({ ...msg, expiredAt: now });
    } else {
      stillActive.push(msg);
    }
  });
  messages = stillActive;
  saveMessages();
}

// ===== อัปเดตนับถอยหลัง + ลบข้อความที่หมดเวลา =====
function updateMessages() {
  removeExpiredMessages();
  displayMessages();
}

// ===== Event ส่งข้อความ =====
sendBtn.addEventListener("click", function () {
  const text = messageInput.value.trim();
  if (text !== "") {
    messages.push({ text: text, timestamp: Date.now() });
    saveMessages();
    messageInput.value = "";
    displayMessages();
  } else {
    alert("กรุณาพิมพ์ข้อความก่อนส่ง");
  }
});

// ===== Enter ส่งข้อความ =====
messageInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// ===== ดูข้อความหมดอายุ =====
viewExpiredBtn.addEventListener("click", function () {
  expiredOutput.innerHTML = "";
  if (expiredMessages.length === 0) {
    expiredOutput.textContent = "ยังไม่มีข้อความหมดอายุ";
  } else {
    expiredMessages.forEach((msg) => {
      const msgDiv = document.createElement("div");
      const timeStr = new Date(msg.expiredAt).toLocaleTimeString();
      msgDiv.textContent = `${msg.text} (หมดเวลา: ${timeStr})`;
      expiredOutput.appendChild(msgDiv);
    });
  }
});

// ===== เริ่มต้น =====
displayMessages();
setInterval(() => {
  checkExpiredMessages();
  displayMessages();
  console.log("here");

  if (expiredVisible) {
    displayExpiredMessages();
  }
}, 2000);
// อัปเดตทุก 1 วินาที
setInterval(updateMessages, 1000);
