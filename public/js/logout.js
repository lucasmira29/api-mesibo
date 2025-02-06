const h2Element = document.getElementById('message-countdown');

document.addEventListener('DOMContentLoaded', () => {
  if (!window.opener) {
    h2Element.innerText = "Por favor, feche esta aba manualmente";
    return;
  }
});


const countdownElement = document.getElementById('countdown');
    let seconds = 10; 

    const timer = setInterval(() => {
      seconds--;
      countdownElement.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(timer);
        window.close();
      }
    }, 1000);
