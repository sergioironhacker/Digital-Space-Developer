class Game {
    constructor(container) {
        // Constructor de la clase Game, inicializa las propiedades del juego
        this.container = container; // Establecer el contenedor del juego
        this.player = new Player(this.container); // Crear una instancia del jugador en el contenedor
        this.words = new Words(this.container, this.player); // Crear una instancia de las palabras en el contenedor, pasando el jugador como argumento
    }
}
