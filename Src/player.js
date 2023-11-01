class Player {
    constructor(container) {
        this.container = container;
        this.width = 120;
        this.height = 120;
        this.x = (this.container.offsetWidth / 2) - (this.width / 2);
        this.y = this.container.offsetHeight - this.height - 20;
        this.bullets = [];
        this.lives = 3;
        this.score = 0;


        this.element = document.createElement("div");

        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/nave.png)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;


        this.container.appendChild(this.element);

    }

        shoot() {
        const playerX = this.x + this.width / 14;
        const playerY = this.y + this.height;
        this.bullets.push(
            new Laser(
                this.container,
                playerX,
                playerY,
            )
        );
    }

    move(e) {
        const { clientX } = e;
        this.x = clientX;
        this.element.style.left = `${this.x - (this.width / 2)}px`;
    }

    updateScore() {
        this.score = this.score + 1;
        document.getElementById("points").innerHTML = this.score;
    }

    updateLives() {
        this.lives = this.lives - 1;
        document.getElementById("live").innerHTML = this.lives;

    }
}



