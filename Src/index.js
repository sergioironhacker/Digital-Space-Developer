window.addEventListener("load", () => {
  // Cuando se carga la página completamente
  const startContainer = document.getElementById("background-image"); // Obtener el contenedor de inicio
  const startButton = document.getElementById("start-button"); // Obtener el botón de inicio
  const container = document.getElementById("game-board"); // Obtener el contenedor del juego
  const backgroundMusic = document.getElementById("background-music"); // Obtener la música de fondo
  const timerElement = document.getElementById("timer"); // Obtener el elemento del temporizador
  let game = null; // Variable para el juego
  let timeLeft = 7; // Tiempo restante inicial de juego
  let timerInterval; // Intervalo para actualizar el temporizador
  let firstTimePlay = true;
  // Función para actualizar el temporizador
  function updateTimer() {
    timerElement.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      console.log("Se acaba")
      clearInterval(timerInterval); // Detener el temporizador cuando el tiempo llega a cero
      container.hidden = true;
      startContainer.style.display = 'block';
      startButton.style.display = 'block';
      document.getElementById("timer").innerHTML = 30;
      timeLeft = 15;
      game = null;
      firstTimePlay = false;
    }
  }

  backgroundMusic.play(); // Reproducir la música de fondo al cargar la página

  startButton.addEventListener('click', () => {
    // Cuando se hace clic en el botón de inicio
    startContainer.style.display = 'none'; // Ocultar el contenedor de inicio
    startButton.style.display = 'none'; // Ocultar el botón de inicio

    timerInterval = setInterval(updateTimer, 1000); // Iniciar el temporizador, actualizando cada segundo

    backgroundMusic.pause(); // Pausar la música de fondo al iniciar el juego

    game = new Game(container); // Crear una instancia del juego en el contenedor
    container.hidden = false;
    game.player.x = 456;
    game.player.y = 532
    console.log("Este es el player " + JSON.stringify(game.player));

    document.addEventListener('mousemove', (e) => {
      game.player.move(e); // Manejar el movimiento del jugador con el mouse
    });

    document.addEventListener('click', (e) => {
      game.player.shoot(); // Manejar el disparo del jugador al hacer clic
    });
  });
});
