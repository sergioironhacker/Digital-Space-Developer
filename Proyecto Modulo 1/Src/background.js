class Background {
    constructor(container) {
        this.container = container;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetheight;

        this.x = 0;
        this.y = 0;

        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/espacio.jpeg)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "bottom";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`; 
        this.element.style.top = `${this.y}px`; 
        
        

      

        this.container.appendChild(this.element);
    }
}