class Laser {
    constructor(container, x, y, explosionElement) {
        this.container = container;
        this.width = 10;
        this.height = 50;
        this.x = x - this.width / 2;
        this.y = y - this.height - 40;
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
        this.move();

        this.animationId = null
        this.explosionElement = explosionElement;


        this.audioElement = document.getElementById("laser-sound");
        this.playLaserSound();
    }

    playLaserSound() {
        if (this.audioElement) {
            this.audioElement.currentTime = 0;
            this.audioElement.play();
        }
    }

    

    checkCollision(wordElement) {
   
        const laserRect = this.element.getBoundingClientRect();
        const wordRect = wordElement.getBoundingClientRect();

        if (
            laserRect.right > wordRect.left &&
            laserRect.left < wordRect.right &&
            laserRect.bottom > wordRect.top &&
            laserRect.top < wordRect.bottom
        ) {
            this.showExplosion(wordRect.left, wordRect.top, wordRect.width, wordRect.height);
            this.playExplosionSound();
            return true;
        }

        return false;
    }
    
    playExplosionSound() {
        const explosionSound = document.getElementById("explosion-sound");
        if (explosionSound) {
            explosionSound.currentTime = 0;
            explosionSound.play();
        }
    }




    showExplosion(x, y, width, height) {
       
        const explosionElement = document.getElementById("explosion"); 
        if(explosionElement) {    
        explosionElement.style.left = x + "px";
        explosionElement.style.top = y + "px";
        explosionElement.style.width = width + "200 px";
        explosionElement.style.height = height + "200 px";
        explosionElement.style.display = "block";
        
        setTimeout(() => {
            explosionElement.style.display = "none";
        }, 1000);
    }
}


    move() {
        this.y -= this.vy;
        this.element.style.top = `${this.y}px`;
        if (this.y < 0) {
            this.container.removeChild(this.element);
        } else {

            this.animationId = requestAnimationFrame(() => this.move());
        }
    }
}