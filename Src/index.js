window.addEventListener("load", () => {
    const startContainer = document.getElementById("background-image");
    const startButton = document.getElementById("start-button");
    const container = document.getElementById("game-board");
    const backgroundMusic = document.getElementById("background-music");
    const timerElement = document.getElementById("timer");
    const playMusicButton = document.getElementById("play-music-button");
    const instructionsButton = document.getElementById("instructions-button");
    const instructions = document.getElementById("instructions");


    let game = null;
    let timeLeft = 7;
    let timerInterval;



    instructionsButton.addEventListener("click", () => {
        if (instructions.style.display === "none" || instructions.style.display === "") {
            instructions.style.display = "block";
        } else {
            instructions.style.display = "none";
        }
    });



    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) {
            toggleMusic();
            playMusicButton.style.display = 'none';
        }
    });



    function updateTimer() {
        timerElement.textContent = timeLeft;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            game.words.stop();
        }
    }


    startButton.addEventListener('click', () => {
        instructionsButton.style.display = "none";
        startContainer.style.display = 'none';
        startButton.style.display = 'none';
        backgroundMusic.pause();
        timerInterval = setInterval(updateTimer, 1000);
        game = new Game(container);


        document.addEventListener('mousemove', (e) => {
            game.player.move(e);

        });

        document.addEventListener('click', (e) => {
            if (game && game.player) {
                const bullet = game.player.shoot();

                if (bullet) {
                    game.words.activeWords.forEach((word) => {
                        if (bullet.checkCollision(word.element)) {
                            bullet.showExplosion(
                                word.element.offsetLeft,
                                word.element.offsetTop,
                                word.element.offsetWidth,
                                word.element.offsetHeight
                            );
                            // Agrega aquí la lógica para eliminar la palabra y aumentar el puntaje
                        }
                    });
                }
            }
        });
    });
});
