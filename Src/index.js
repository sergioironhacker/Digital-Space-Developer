window.addEventListener("load", () => {
    const startContainer = document.getElementById("background-image");
    const startButton = document.getElementById("start-button");
    const container = document.getElementById("game-board");
    const backgroundMusic = document.getElementById("background-music");
    let game = null;
  

    backgroundMusic.play();
  

   startButton.addEventListener('click', () => {
    // Ocultar el botón una vez que se inicia el juego
    startContainer.style.display = 'none';
    startButton.style.display = 'none';

    

    backgroundMusic.pause();



    // Iniciar el juego solo cuando se hace clic en el botón
    game = new Game(container);


    


    document.addEventListener('mousemove', (e) => {
        game.player.move(e);
       
    });

    document.addEventListener('click', (e) => {
        game.player.shoot();
    });

   });
   

});