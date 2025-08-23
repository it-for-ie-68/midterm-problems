
const images = ["S__22683671.jpg",
  "S__22691843.jpg",
  "Screen Shot 2025-08-11 at 11.51.47 PM.png",
  "Screen Shot 2025-08-09 at 6.00.24 PM.png",
  "Screen Shot 2025-08-11 at 11.53.23 PM.png"];
let currentIndex = 0;

const clubImage = document.getElementById("club-image");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

function showImage(index) {
    clubImage.src = images[index];
}

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // วนไปภาพสุดท้าย
    }
    showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; // วนกลับไปภาพแรก
    }
    showImage(currentIndex);
});

// เริ่มต้นภาพแรก
showImage(currentIndex);

