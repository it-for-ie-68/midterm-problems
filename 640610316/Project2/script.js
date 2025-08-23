document.addEventListener('DOMContentLoaded', () => {
  const changeColorBtn = document.getElementById('changeColorBtn');

  changeColorBtn.addEventListener('click', () => {
    const color = getRandomColor();
    document.body.style.backgroundColor = color;
  });
});

function getRandomColor() {
  const colors = [
    '#2196F3', 
    '#4CAF50', 
    '#F44336', 
    '#FFC107', 
    '#9C27B0', 
    '#00BCD4', 
    '#E91E63', 
    '#795548', 
    '#3F51B5', 
    '#8BC34A', 
    '#FF9800', 
    '#607D8B', 
    '#FFEB3B', 
    '#00E676', 
    '#00B0FF', 
    '#FFFFFF' 
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitFeedback');
  const feedbackInput = document.getElementById('feedbackInput');
  const displayFeedback = document.getElementById('displayFeedback');

  submitBtn.addEventListener('click', () => {
    const feedback = feedbackInput.value.trim();
    if (feedback) {
      displayFeedback.textContent = '';
      feedbackInput.value = '';
    } else {
      displayFeedback.textContent = 'กรุณาพิมพ์ข้อความก่อนส่ง';
    }
  });
});
