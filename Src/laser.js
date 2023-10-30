class Laser {
    constructor(container, x, y) {
        // Constructor de la clase Laser, inicializa las propiedades de la bala láser
        this.container = container; // Contenedor en el que se encuentra la bala
        this.width = 10; // Ancho de la bala
        this.height = 50; // Alto de la bala

        // Posición inicial de la bala (ajustada para que esté centrada)
        this.x = x - this.width / 2;
        this.y = y - this.height - 40;

        this.vy = 10; // Velocidad vertical de la bala

        this.element = document.createElement("div"); // Crear un elemento HTML para representar la bala

        this.element.style.position = "absolute"; // Establecer posición absoluta
        this.element.style.width = `${this.width}px`; // Ancho de la bala
        this.element.style.height = `${this.height}px`; // Alto de la bala
        this.element.style.left = `${this.x}px`; // Posición horizontal
        this.element.style.top = `${this.y}px`; // Posición vertical
        this.element.style.backgroundColor = "rgb(243, 243, 150)"; // Color de fondo de la bala
        this.element.style.borderRadius = "15px"; // Borde redondeado
        this.element.style.boxShadow = "0px 0px 20px 10px #0ff"; // Sombra

        this.container.appendChild(this.element); // Agregar la bala al contenedor

        this.move(); // Llamar al método para mover la bala
    }

    move() {
        // Método para mover la bala láser
        this.y -= this.vy; // Actualizar la posición vertical de la bala (mover hacia arriba)
        this.element.style.top = `${this.y}px`; // Actualizar la posición vertical del elemento de la bala
        if (this.y < 0) {
            // Si la bala sale de la pantalla
            this.container.removeChild(this.element); // Quitar la bala del contenedor
        } else {
            // Si la bala sigue en pantalla, programar la próxima animación de movimiento
            requestAnimationFrame(() => this.move());
        }
    }
}
