class Words {
    constructor(container, player, playerHeight) {
        // Constructor de la clase Words, inicializa las propiedades
        console.log(player); // Imprimir información del jugador

        this.container = container; // Contenedor del juego
        this.width = 50; // Ancho de las palabras
        this.height = 50; // Alto de las palabras
        this.posY = player - playerHeight; // Posición vertical inicial de las palabras
        this.posX; // Posición horizontal (inicialmente indefinida)
        this.activeWords = []; // Almacenamiento de palabras activas
        this.player = player; // Jugador


        // Palabras disponibles para el juego (dos listas)
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

        // Configuración de tiempo y velocidad de las palabras
        this.lastSpawnTime = 0;
        this.spawnInterval = 3000; // Tiempo en milisegundos entre la aparición de nuevas palabras
        this.wordSpeed = 2; // Velocidad de caída constante

        // Iniciar el ciclo de actualización
        this.update();
    }

    createAndMoveWord() {
        // Crear y mover una palabra
        const randomWord = this.getRandomWord(); // Obtener una palabra aleatoria
        this.posX = 500; // Posición horizontal inicial de la palabra
        const posY = -this.height; // Posición vertical inicial de la palabra
        const wordElement = this.createWordElement(randomWord, this.posX, posY);

        // Agregar la palabra al contenedor y rastrearla como palabra activa
        this.container.appendChild(wordElement);
        this.activeWords.push({ element: wordElement, posY, posX: this.posX, speed: this.wordSpeed, name: randomWord });
    }

    update() {
        // Revisamos si queda tiempo
        const remainingGameTime = parseInt(document.getElementById("timer").textContent);
        //console.log("Queda tiempo " + remainingGameTime);
        // if(remainingGameTime <= 0) {
        //   return "Game Over";
        // } 
        // Función de actualización del juego
        console.log("PAlabra en pantalla  " + JSON.stringify(this.activeWords));
        const currentTime = Date.now();

        // Comprobar si es el momento de crear una nueva palabra
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            this.createAndMoveWord(); // Crear y mover una nueva palabra
            this.lastSpawnTime = currentTime; // Actualizar el tiempo de la última aparición
        }

        for (let i = this.activeWords.length - 1; i >= 0; i--) {
            const word = this.activeWords[i];

            // Mover la palabra hacia abajo
            word.posY += word.speed;
            word.element.style.top = word.posY + "px";

            let currentBullets = this.player.bullets;

            // Comprobar si una bala golpea una palabra
            if (currentBullets != null && currentBullets != undefined && currentBullets.length != 0) {
                for (let counter = 0; currentBullets.length > counter; counter++) {
                    let currentBullet = currentBullets[counter];
                    if (currentBullet.y <= word.posY && (Math.round(currentBullet.x) - 50 <= Math.round(word.posX) &&
                        Math.round(currentBullet.x) + 50 >= Math.round(word.posX))) {
                        const goodWords = [...this.allWords[0]];
                        console.log("Comparacion de palabra " + word.name);
                        if (goodWords.includes(word.name)) {
                            const score = document.getElementById("points").innerHTML;
                            const newScore = parseInt(score) + 1;
                            document.getElementById("points").innerHTML = newScore;
                        } else {
                            const lives = document.getElementById("live").innerHTML;
                            const newLives = parseInt(lives) - 1;
                            if(newLives <= 0) {
                                document.getElementById("live").innerHTML = newLives;
                                throw new Error("El juego acabo");  
                            }
                            document.getElementById("live").innerHTML = newLives;
                        }


                        // Eliminar la bala del jugador
                        let indexBullet = this.player.bullets.indexOf(currentBullet);
                        this.player.bullets.splice(indexBullet, 1);

                        // Quitar la palabra del contenedor y de la lista de palabras activas
                        this.container.removeChild(word.element);
                        this.activeWords.splice(i, 1);
                    }
                }
            }

            // Quitar la palabra si se ha desplazado fuera del contenedor
            if (word.posY > this.container.offsetHeight) {
                this.container.removeChild(word.element);
                this.activeWords.splice(i, 1);
            }
        }

        // Llamar a la función 'update' nuevamente para la próxima actualización
        requestAnimationFrame(() => this.update());
    }

    getRandomWord() {
        // Obtener una palabra aleatoria de las listas de palabras disponibles
        const wordSet = this.allWords[Math.floor(Math.random() * this.allWords.length)];
        return wordSet[Math.floor(Math.random() * wordSet.length)];
    }

    createWordElement(word, posX, posY) {
        // Crear un elemento de palabra con estilo y texto específicos
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

        // Configuración del sombreado del texto
        wordElement.style.textShadow = "-8px -8px 10px rgba(0, 0, 255, 0.8), 8px -8px 10px rgba(0, 0, 255, 0.8), -8px 8px 10px rgba(0, 0, 255, 0.8), 8px 8px 10px rgba(0, 0, 255, 0.8)";

        // Cambiar el color de la palabra después de 2 segundos
        setTimeout(() => {
            wordElement.style.color = "yellow";
        }, 2000);

        return wordElement;
    }
}

