window.addEventListener("load", () => {
    const startContainer = document.getElementById("background-image");
    const startButton = document.getElementById("start-button");
    const container = document.getElementById("game-board");
    const backgroundMusic = document.getElementById("background-music");
    const timerElement = document.getElementById("timer");
    const playMusicButton = document.getElementById("play-music-button");

    let game = null;
    let timeLeft = 30;
    let timerInterval;


    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) { // 32 es el código de tecla para "Espacio"
            toggleMusic();
            playMusicButton.style.display = 'none'; // Oculta el botón después de iniciar la música.
        }
    });






    function updateTimer() {
        timerElement.textContent = timeLeft;
        timeLeft--;
    
        if (timeLeft < 0) {
          
        
          clearInterval(timerInterval);
        }
    }
    
  

    
  

   startButton.addEventListener('click', () => {
    
    startContainer.style.display = 'none';
    startButton.style.display = 'none';
    backgroundMusic.pause();
    timerInterval = setInterval(updateTimer, 1000);



    
    game = new Game(container);

    document.addEventListener('mousemove', (e) => {
        game.player.move(e);
       
    });

    document.addEventListener('click', (e) => {
        game.player.shoot();
    });
    

   });
   

});