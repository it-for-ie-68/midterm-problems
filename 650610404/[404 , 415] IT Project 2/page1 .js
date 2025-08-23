document.addEventListener("DOMContentLoaded", function () {
  const themeButton = document.getElementById("themeButton");
  const body = document.body;

  const themes = ["light", "dark", "rose"];
  let currentTheme = localStorage.getItem("theme") || "light";

  function applyTheme(theme) {
    body.classList.remove("light-theme", "dark-theme", "rose-theme");
    body.classList.add(`${theme}-theme`);

    // เปลี่ยนไอคอน
    if (theme === "light") themeButton.textContent = "🌞";
    if (theme === "dark") themeButton.textContent = "🌙";
    if (theme === "rose") themeButton.textContent = "🌹";

    // บันทึกค่า
    localStorage.setItem("theme", theme);
  }

  // โหลดธีมที่บันทึกไว้
  applyTheme(currentTheme);

  // เมื่อกดปุ่ม เปลี่ยนธีมวน
  themeButton.addEventListener("click", function () {
    let index = themes.indexOf(currentTheme);
    currentTheme = themes[(index + 1) % themes.length];
    applyTheme(currentTheme);
  });
  //  SCROLL: ปุ่มกลับไปด้านบน (Back to Top)
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
  let currentUserName = localStorage.getItem("commentUserName") || "";
  let comments = JSON.parse(localStorage.getItem("commentsData")) || [];
  function renderComments() {
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";

    comments.forEach((c, index) => {
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.dataset.index = index;

      let actionButtons = "";
      if (c.name === currentUserName) {
        actionButtons = `
        <button class="editBtn" data-action="edit" data-index="${index}">แก้ไข</button>
        <button class="deleteBtn" data-action="delete" data-index="${index}">ลบ</button>
      `;
      }

      newComment.innerHTML = `
      <strong>${c.name}</strong> 
      <span class="commentText">${c.text}</span>
      ${actionButtons}
    `;
      commentList.appendChild(newComment);
    });
  }
  // ฟังก์ชันลบคอมเมนต์
  function deleteComment(index) {
    if (confirm("คุณต้องการลบคอมเมนต์นี้หรือไม่?")) {
      comments.splice(index, 1);
      localStorage.setItem("commentsData", JSON.stringify(comments));
      renderComments();
    }
  }

  // ฟังก์ชันแก้ไขคอมเมนต์
  function editComment(index) {
    const newText = prompt("แก้ไขข้อความคอมเมนต์:", comments[index].text);
    if (newText !== null && newText.trim() !== "") {
      comments[index].text = newText.trim();
      localStorage.setItem("commentsData", JSON.stringify(comments));
      renderComments();
    }
  }

  // ใช้ event delegation แทน onclick inline
  document.getElementById("commentList").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const action = e.target.dataset.action;
      const index = Number(e.target.dataset.index);
      if (action === "delete") {
        deleteComment(index);
      } else if (action === "edit") {
        editComment(index);
      }
    }
  });

  // เปิด overlay
  document.getElementById("openComment").addEventListener("click", function () {
    document.getElementById("commentOverlay").style.display = "flex";
    if (currentUserName) {
      document.getElementById("nameForm").style.display = "none";
      document.getElementById("commentForm").style.display = "block";
      renderComments();
    } else {
      document.getElementById("nameForm").style.display = "block";
      document.getElementById("commentForm").style.display = "none";
    }
  });

  // ปิด overlay
  document
    .querySelector(".closeOverlay")
    .addEventListener("click", function () {
      document.getElementById("commentOverlay").style.display = "none";
    });

  // ตั้งชื่อ
  document.getElementById("nameBtn").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value.trim();
    if (name) {
      currentUserName = name;
      localStorage.setItem("commentUserName", name);
      document.getElementById("nameForm").style.display = "none";
      document.getElementById("commentForm").style.display = "block";
      renderComments();
    } else {
      alert("กรุณากรอกชื่อก่อนคอมเมนต์");
    }
  });

  // ส่งคอมเมนต์
  document.getElementById("sendComment").addEventListener("click", function () {
    const commentText = document.getElementById("commentInput").value.trim();
    if (commentText !== "") {
      const newCommentObj = { name: currentUserName, text: commentText };
      comments.push(newCommentObj);
      localStorage.setItem("commentsData", JSON.stringify(comments));
      renderComments();
      document.getElementById("commentInput").value = "";
    }
  });
});
