 class Player {
    constructor(container) {
        this.container = container;
        this.width = 100;
        this.height = 100;
        this.x = (this.container.offsetWidth / 2) - (this.width / 2);
        this.y = this.container.offsetHeight - this.height - 20;
        this.bullets = [];
        this.live = document.querySelector('i');
        this.lives = 3;
       

        this.element = document.createElement("div");

        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/nave.png)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
       // this.element.style.borderRadius = "15px";
        // this.element.style.boxShadow = "0px 0px 20px 10px #fff";
       


        this.container.appendChild(this.element);
    }

    shoot() {
        const playerX = this.x + this.width / 2 - 5;
        this.bullets.push(
            new Laser(
                this.container,
                this.x,
                playerX,
            )
        );
    }

    move(e) {
        const { clientX } = e;
        this.x = clientX;
        this.element.style.left = `${this.x - (this.width / 2)}px`;
    }
}



