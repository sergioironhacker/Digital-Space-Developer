class Background {
    constructor(container) {
        // Constructor de la clase Background, inicializa las propiedades del fondo
        this.container = container; // Establecer el contenedor del fondo
        this.width = this.container.offsetWidth; // Ancho del fondo igual al ancho del contenedor
        this.height = this.container.offsetHeight; // Alto del fondo igual al alto del contenedor

        this.x = 0; // Posición horizontal inicial del fondo
        this.y = 0; // Posición vertical inicial del fondo

        this.element = document.createElement("div"); // Crear un elemento HTML para representar el fondo

        this.element.style.position = "absolute"; // Establecer posición absoluta
        this.element.style.background = `url(./assets/espacio.jpeg)`; // Establecer una imagen de fondo
        this.element.style.backgroundSize = "cover"; // Ajustar el tamaño del fondo
        this.element.style.backgroundPosition = "bottom"; // Posición de la imagen de fondo
        this.element.style.width = `${this.width}px`; // Ancho del elemento igual al ancho del fondo
        this.element.style.height = `${this.height}px`; // Alto del elemento igual al alto del fondo
        this.element.style.left = `${this.x}px`; // Posición horizontal del elemento
        this.element.style.top = `${this.y}px`; // Posición vertical del elemento

        this.container.appendChild(this.element); // Agregar el fondo al contenedor
    }
}
