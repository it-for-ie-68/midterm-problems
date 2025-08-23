console.log("Hello, World!");

const btn = document.querySelector("button");
const fireflyImage = document.getElementById("firefly-image");


console.log(btn);
btn.addEventListener("click", clickHandler);


function clickHandler() {
    alert("ขอบคุณครับ.");
    console.log("Button clicked!");}   


fireflyImage.addEventListener("mouseenter", function() {
    fireflyImage.src = "firefly2.png";
  });

fireflyImage.addEventListener("mouseleave", function() {
    fireflyImage.src = "firefly.png";
  });
