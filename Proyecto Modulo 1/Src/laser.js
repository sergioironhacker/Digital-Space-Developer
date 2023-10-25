class Laser {
    constructor(container, x, y) {
        this.container = container;
        this.width = 10;
        this.height = 50;


        this.x = x;
        this.y = y;

        this.vy = 10;

        this.element = document.createElement("div");

        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.backgroundColor = "rgb(243, 243, 150)";
        this.element.style.borderRadius = "15px";
        this.element.style.boxShadow = "0px 0px 20px 10px #0ff";

        this.container.appendChild(this.element);


    }
    move() {
        this.y -= this.vy;
        this.element.style.top = `${this.y}px`;
    }
}