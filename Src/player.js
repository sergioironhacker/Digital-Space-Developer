class Player {
    constructor(container, selectedCharacter) {
        this.container = container;
        this.width = 120;
        this.height = 120;
        this.x = (this.container.offsetWidth / 2) - (this.width / 2);
        this.y = this.container.offsetHeight - this.height - 20;
        this.bullets = [];
        this.lives = 5;
        this.score = 0;



        this.element = document.createElement("div");

        this.element.style.position = "absolute";

        if (selectedCharacter === "nave") {
            this.element.style.backgroundImage = `url(./Assets/nave.png)`;
        } else if (selectedCharacter === "platillo") {
            this.element.style.backgroundImage = `url(./Assets/platillo.png)`;
        }




        this.element.style.backgroundSize = "cover";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.boxShadow = "0 0 20px white, 0 0 40px rgba(0, 0, 255, 0.7)";
        this.element.style.borderRadius = "50%";

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
        if (this.score === 2) {
            const levelElement = document.getElementById("level");
            levelElement.innerHTML = `🛸 Nivel: <i>2</i>`;
        }



    }

    updateLives() {
        this.lives = this.lives - 1;
        document.getElementById("live").innerHTML = this.lives;

    }
}



