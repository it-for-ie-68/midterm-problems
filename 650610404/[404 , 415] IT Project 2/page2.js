// page2.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. การตอบสนองต่อการคลิก (Click)
  // เมื่อคลิกที่ปุ่ม 'กลับสู่หน้าหลัก' จะแสดงข้อความแจ้งเตือน
  const backToHomeLink = document.querySelector(".back-to-home a");
  if (backToHomeLink) {
    backToHomeLink.addEventListener("click", (event) => {
      alert("คุณกำลังจะกลับสู่หน้าหลัก");
    });
  }

  // 2) CLICK: สร้างปุ่ม Like และ Dislike + ตัวนับ ให้แต่ละการ์ดเพลง
  const songCards = document.querySelectorAll(".song-item");
  songCards.forEach((card) => {
    // ตรวจสอบว่ามีการสร้างปุ่มแล้วหรือยัง
    if (card.querySelector(".like-wrap")) {
      return; // ถ้ามีอยู่แล้วให้ออกจากการทำงาน
    }

    // สร้าง wrapper
    const likeWrap = document.createElement("div");
    likeWrap.className = "like-wrap";

    // สร้างปุ่ม Like
    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.setAttribute("type", "button");
    likeBtn.innerText = "❤️ Like";

    const likeCount = document.createElement("span");
    likeCount.className = "like-count";
    likeCount.innerText = "0";

    // สร้างปุ่ม Dislike
    const dislikeBtn = document.createElement("button");
    dislikeBtn.className = "dislike-btn";
    dislikeBtn.setAttribute("type", "button");
    dislikeBtn.innerText = "💔 Dislike";

    const dislikeCount = document.createElement("span");
    dislikeCount.className = "dislike-count";
    dislikeCount.innerText = "0";

    // ใส่ลงใน wrapper และเพิ่ม wrapper ลงใน card
    likeWrap.appendChild(likeBtn);
    likeWrap.appendChild(likeCount);
    likeWrap.appendChild(dislikeBtn);
    likeWrap.appendChild(dislikeCount);
    card.appendChild(likeWrap);

    // คลิกปุ่ม Like แล้ว +1
    likeBtn.addEventListener("click", () => {
      const current = parseInt(likeCount.innerText, 10) || 0;
      likeCount.innerText = String(current + 1);
      // เอฟเฟกต์เด้ง
      likeCount.style.transform = "scale(1.15)";
      likeCount.style.transition = "transform 120ms ease";
      setTimeout(() => {
        likeCount.style.transform = "scale(1)";
      }, 120);
    });

    // คลิกปุ่ม Dislike แล้ว +1
    dislikeBtn.addEventListener("click", () => {
      const current = parseInt(dislikeCount.innerText, 10) || 0;
      dislikeCount.innerText = String(current + 1);
      // เอฟเฟกต์เด้ง
      dislikeCount.style.transform = "scale(1.15)";
      dislikeCount.style.transition = "transform 120ms ease";
      setTimeout(() => {
        dislikeCount.style.transform = "scale(1)";
      }, 120);
    });
  });

  // 3) INPUT: ช่องค้นหาเพลงแบบเรียลไทม์
  const searchInput = document.getElementById("songSearch");
  if (searchInput) {
    const normalize = (s) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    searchInput.addEventListener("input", (e) => {
      const q = normalize(e.target.value || "");
      const songCards = document.querySelectorAll(".song-item");
      songCards.forEach((card) => {
        const titleEl = card.querySelector(".song-title");
        const text = titleEl ? normalize(titleEl.textContent || "") : "";
        const hit = text.includes(q);
        card.classList.toggle("hidden", !hit);
      });
    });
  }

  // 4) CHANGE: เปลี่ยนธีมด้วย select
  const themeSelect = document.getElementById("themeSelect");
  const applyTheme = (val) => {
    document.body.classList.remove("theme-dark", "theme-rose");
    if (val === "dark") document.body.classList.add("theme-dark");
    if (val === "rose") document.body.classList.add("theme-rose");
  };
  if (themeSelect) {
    const saved = localStorage.getItem("sb_theme");
    if (saved) {
      themeSelect.value = saved;
      applyTheme(saved);
    }
    themeSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      applyTheme(val);
      localStorage.setItem("sb_theme", val);
    });
  }
  // 5) SCROLL: ปุ่มกลับไปด้านบน (Back to Top)
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    // ฟังก์ชันแสดง/ซ่อนปุ่ม
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    // เมื่อผู้ใช้เลื่อนหน้าจอ
    window.onscroll = () => scrollFunction();

    // เมื่อผู้ใช้คลิกปุ่ม
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // เลื่อนกลับไปบนสุดแบบนุ่มนวล
    });
  }
});
