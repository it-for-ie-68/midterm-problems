const video = document.getElementById("myVideo");
const btnSound = document.getElementById("btnMutetoggle");

btnSound.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;

    btnSound.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 -960 960 960"
        width="18px" 
        fill="#e3e3e3"
      >
        <path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z" />
      </svg>`;
  } else {
    video.muted = true;

    btnSound.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>`;
  }
});

// // ตั้งสถานะเริ่มต้นให้ตรงกับ video
// if (!video.muted) {
//   btn.innerHTML = `<svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="18px"
//         viewBox="0 -960 960 960"
//         width="18px"
//         fill="#e3e3e3"
//       >
//         <path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z" />
//       </svg>`;
// } else {
//   `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>`;
// }
