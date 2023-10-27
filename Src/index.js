window.addEventListener("load", () => {
    const startContainer = document.getElementById("background-image");
    const startButton = document.getElementById("start-button");
    const container = document.getElementById("game-board");
    const backgroundMusic = document.getElementById("background-music");
    const timerElement = document.getElementById("timer");
    let game = null;
    let timeLeft = 30;
    let timerInterval;
    

    function updateTimer() {
        timerElement.textContent = timeLeft;
        timeLeft--;
    
        if (timeLeft < 0) {
          
        
          clearInterval(timerInterval);
        }
      }
    


    backgroundMusic.play();
  

   startButton.addEventListener('click', () => {
    
    startContainer.style.display = 'none';
    startButton.style.display = 'none';

    timerInterval = setInterval(updateTimer, 1000);

    backgroundMusic.pause();

    
    game = new Game(container);

    document.addEventListener('mousemove', (e) => {
        game.player.move(e);
       
    });

    document.addEventListener('click', (e) => {
        game.player.shoot();
    });
    

   });
   

});