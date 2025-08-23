// IMAGE SLIDER
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;

// เรียกใช้ showSlide() ครั้งแรกเพื่อให้แสดงรูปภาพแรก
document.addEventListener("DOMContentLoaded", () => {
    if (slides.length > 0) {
        showSlide(slideIndex);
    }
});

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}
