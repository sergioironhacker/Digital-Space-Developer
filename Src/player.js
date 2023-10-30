class Player {
    constructor(container) {
        // Constructor de la clase Player, inicializa las propiedades del jugador
        this.container = container;
        this.width = 120;
        this.height = 120;
        this.x = (this.container.offsetWidth / 2) - (this.width / 2); // Posición inicial en el centro horizontal
        this.y = this.container.offsetHeight - this.height - 20; // Posición inicial cerca de la parte inferior
        this.bullets = []; // Almacenamiento de balas disparadas
        this.live = document.querySelector('i'); // Elemento de la vida del jugador
        this.lives = 3; // Número de vidas iniciales

        this.element = document.createElement("div"); // Crear un elemento HTML para representar al jugador
        this.element.setAttribute("id", "player");
        this.element.style.position = "absolute"; // Establecer posición absoluta
        this.element.style.background = `url(./assets/nave.png)`; // Fondo de la nave (imagen)
        this.element.style.backgroundSize = "cover"; // Ajustar el tamaño del fondo
        this.element.style.width = `${this.width}px`; // Ancho de la nave
        this.element.style.height = `${this.height}px`; // Alto de la nave
        this.element.style.left = `${this.x}px`; // Posición horizontal
        this.element.style.top = `${this.y}px`; // Posición vertical
        // this.element.style.borderRadius = "15px"; // (Comentado: posible estilo de borde redondeado)
        // this.element.style.boxShadow = "0px 0px 20px 10px #fff"; // (Comentado: posible sombra)

        this.container.appendChild(this.element); // Agregar la nave al contenedor
    }

    shoot() {
        // Método para disparar una bala
        const playerX = this.x + this.width / 14; // Posición X del jugador (ajuste)
        const playerY = this.y + this.height; // Posición Y del jugador (en la parte inferior)
        this.bullets.push(
            new Laser(
                this.container, // Contenedor del juego
                playerX, // Posición X del disparo
                playerY, // Posición Y del disparo
            )
        );
    }

    move(e) {
        // Método para mover la nave del jugador
        const { clientX } = e; // Coordenada X del evento del mouse
        this.x = clientX; // Actualizar la posición X del jugador
        console.log("ojo ", this.x - (this.width / 2));
        let playerElement = document.getElementById("player");
        console.log("Element " + JSON.stringify(playerElement));
        playerElement.style.left = `${this.x - (this.width / 2)}px`; // Actualizar la posición horizontal de la nave
    }
}

