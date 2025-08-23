function createButtonAndImage() {

  const newButton = document.createElement("button");
  newButton.textContent = "กดฉันสิๆ";
  newButton.style.padding = "10px 10px";
  newButton.style.fontSize = "12px";
  newButton.style.cursor = "pointer";

  newButton.style.position = "absolute";
  newButton.style.top = "550px";
  newButton.style.left = "725px";
  newButton.style.backgroundColor = "white";
  newButton.style.border = "1px solid #ccc"; 

  document.body.appendChild(newButton);
  
  newButton.addEventListener("click", function() {
    const image = document.createElement("img");
    image.src = "20250530_051636.jpg"; 
    image.style.position = "fixed"; 
    image.style.top = "50%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%) scale(0)"; 
    image.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out"; 

    document.body.appendChild(image);

    setTimeout(() => {
      image.style.transform = "translate(-50%, -50%) scale(0.5)";
    }, 10);

    setTimeout(() => {
      image.style.opacity = "0"; 
      image.addEventListener("transitionend", () => {
        image.remove(); 
      }, { once: true });
    }, 1500); 
  });
}

document.addEventListener("DOMContentLoaded", createButtonAndImage);




function createCommentWidget() {
  const mainContainer = document.createElement("div");
  mainContainer.id = "comment-widget-container";
  document.body.appendChild(mainContainer);

  const widgetHeader = document.createElement("div");
  widgetHeader.id = "comment-widget-header";
  mainContainer.appendChild(widgetHeader);

  const toggleButton = document.createElement("button");
  toggleButton.id = "toggle-button";
  toggleButton.textContent = "-";
  widgetHeader.appendChild(toggleButton);

  const commentDisplay = document.createElement("div");
  commentDisplay.id = "comment-display";
  mainContainer.appendChild(commentDisplay);

  const commentInputContainer = document.createElement("div");
  commentInputContainer.id = "comment-input-container";
  mainContainer.appendChild(commentInputContainer);

  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "พิมพ์ความคิดเห็นของคุณ...";
  commentInput.id = "comment-input";

  const submitButton = document.createElement("button");
  submitButton.textContent = "ส่ง";
  submitButton.id = "submit-button";

  commentInputContainer.appendChild(commentInput);
  commentInputContainer.appendChild(submitButton);

  toggleButton.addEventListener("click", function() {
    mainContainer.classList.toggle("collapsed");
    
    if (mainContainer.classList.contains("collapsed")) {
      toggleButton.textContent = "+";
    } else {
      toggleButton.textContent = "-";
    }
  });

  function addComment() {
    const text = commentInput.value.trim();
    if (text) {
      const newComment = document.createElement("p");
      newComment.textContent = text;
      newComment.classList.add("comment-item");
      
      commentDisplay.appendChild(newComment);
      commentInput.value = "";
      
      commentDisplay.scrollTop = commentDisplay.scrollHeight;
    }
  }

  submitButton.addEventListener("click", addComment);
  commentInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addComment();
    }
  });
}

document.addEventListener("DOMContentLoaded", createCommentWidget);



const clickSound = document.createElement("audio");
clickSound.src = "new-notification-011-364050.mp3"; 
clickSound.preload = "auto"; 

document.addEventListener("click", function(event) {
  
  const clickedElement = event.target; 
  if (
    clickedElement.tagName === "BUTTON" ||
    clickedElement.tagName === "A" ||
    window.getComputedStyle(clickedElement).cursor === "pointer"
  ) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});