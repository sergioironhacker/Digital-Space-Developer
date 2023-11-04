window.addEventListener("load", () => {
    const startContainer = document.getElementById("background-image");
    const startButton = document.getElementById("start-button");
    const container = document.getElementById("game-board");
    const backgroundMusic = document.getElementById("background-music");
    const timerElement = document.getElementById("timer");
    const playMusicButton = document.getElementById("play-music-button");
    const instructionsButton = document.getElementById("instructions-button");
    const instructions = document.getElementById("instructions");
    const restartButton = document.getElementById("restart-button");
    const characterSelection = document.getElementById("character-selection");

    let selectedCharacter = null;
    let game = null;
    let timeLeft = 60;
    let timerInterval;

    restartButton.onclick = () => window.location.reload()




    const characterOptions = document.querySelectorAll(".character-option");
    characterOptions.forEach(option => {
        option.addEventListener("click", () => {
            characterOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedCharacter = option.getAttribute("data-character");
        });
    });

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

        const gameOverCondition = timeLeft < 0 || (game.player.lives === 0)
        const winCondition = game.player.score >= 5

        if (gameOverCondition || winCondition) {
            clearInterval(timerInterval);
            if (game && game.words) {
                game.words.stop();
            }

            if (gameOverCondition) {
                document.getElementById("game-over").style.display = "block";
                restartButton.style.display = "flex"
                document.getElementById("dance-character2").style.display = "block";
                playLoseMusic();
            }

            if (winCondition) {
                document.getElementById("you-win").style.display = "block";
                document.getElementById("restart-button").style.display = "flex";
                document.getElementById("dance-character").style.display = "block";
                playWinMusic();
            }
        }

    }



    function playLoseMusic() {
        const loseMusic = document.getElementById("lose-music");
        if (loseMusic) {
            loseMusic.play();
        }
    }



    function playWinMusic() {
        const winMusic = document.getElementById("win-music");
        if (winMusic) {
            winMusic.play();
        }
    }




    startButton.addEventListener('click', () => {

        instructionsButton.style.display = "none";
        startContainer.style.display = 'none';
        startButton.style.display = 'none';
        backgroundMusic.pause();
        timerInterval = setInterval(updateTimer, 1000);
        game = new Game(container, selectedCharacter || 'nave')
        characterSelection.style.display = "none";


        document.getElementById("game-over").style.display = "none";



        document.addEventListener('mousemove', (e) => {
            game.player.move(e);

        });

        document.addEventListener('click', (e) => {
            game.player.shoot();
        });
    });
});
