class Words {
    constructor(container, playerPosY, playerHeight) {
        this.container = container;
        this.width = 50;
        this.height = 50;
        this.posY = playerPosY - playerHeight;

        this.activeWords = [];
        this.playerPosY = playerPosY;

        this.allWords = [
            ["variable", "funcion", "if", "else", "for", "while", "console",
                "array", "object", "return", "true", "false", "null", "undefined",
                "class", "constructor", "prototype", "async", "await", "map",
                "filter", "reduce", "promise", "import", "export"],

            ["serpiente python", "java", "csharp", "ruby", "php", "Dominio del DOM", "Carlos++",
                "html", "css", "typescript", "scala", "chat gpt", "Macallan", "perl",
                "sql", "caca", "Use", "lua", "Thor", "esvastik", "Hellow, Wordl!", "pascal",
                "haskell", "ironHack", "prolog"]
        ];

        //  setInterval(() => this.createAndMoveWord(), 3000);

        this.lastSpawnTime = 0;
        this.spawnInterval = 3000; // Tiempo en milisegundos entre la aparición de nuevas palabras
        this.wordSpeed = 2; // Velocidad de caída constante

        this.update();

    }

    createAndMoveWord() {
        const randomWord = this.getRandomWord();
        const posX = Math.random() * (this.container.offsetWidth - this.width);
        const posY = -this.height;
        const wordElement = this.createWordElement(randomWord, posX, posY);

        this.container.appendChild(wordElement);
        this.activeWords.push({ element: wordElement, posY, speed: this.wordSpeed });
    }

    update() {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            this.createAndMoveWord();
            this.lastSpawnTime = currentTime;
        }

        for (let i = this.activeWords.length - 1; i >= 0; i--) {
            const word = this.activeWords[i];
            word.posY += word.speed;
            word.element.style.top = word.posY + "px";

            if (word.posY > this.playerPosY) {
                // Comprueba si la palabra llega al jugador
                // Aquí puedes agregar la lógica para manejar la colisión
                // Por ejemplo, eliminar la palabra y restar puntos al jugador
                // this.container.removeChild(word.element);
                // this.activeWords.splice(i, 1);
            }

            if (word.posY > this.container.offsetHeight) {
                this.container.removeChild(word.element);
                this.activeWords.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.update());
    }

    getRandomWord() {
        const wordSet = this.allWords[Math.floor(Math.random() * this.allWords.length)];
        return wordSet[Math.floor(Math.random() * wordSet.length)];
    }

    createWordElement(word, posX, posY) {
        const wordElement = document.createElement("div");
        wordElement.textContent = word;
        wordElement.style.color = "white";
        wordElement.style.fontFamily = "Arial";
        wordElement.style.fontSize = "24px";
        wordElement.style.position = "absolute";
        wordElement.style.left = posX + "px";
        wordElement.style.top = posY + "px";
        wordElement.style.transition = "color 1s";
        wordElement.style.color = "white";


         //wordElement.style.textShadow = "8px 8px 10px rgba(0, 0, 255, 1)";
         wordElement.style.textShadow = "-8px -8px 10px rgba(0, 0, 255, 0.8), 8px -8px 10px rgba(0, 0, 255, 0.8), -8px 8px 10px rgba(0, 0, 255, 0.8), 8px 8px 10px rgba(0, 0, 255, 0.8)";


        setTimeout(() => {
        wordElement.style.color = "yellow";
        }, 2000);

        return wordElement;
    }
}





