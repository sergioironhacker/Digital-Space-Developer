class Words {
    constructor(container, player) {
        this.container = container;
        this.width = 50;
        this.height = 50;

        this.wordSpeed = 2;

        this.activeWords = [];
        this.player = player;
        this.playerPosY = player.y;
        this.keepUpdating = true;
        this.allWords = [
            ["finally()", "function", "if", "else", "for", "while", "then()",
                "array", "object", "return", "true", "false", "null", "undefined",
                "class", "constructor", "Callback", "async", "resolve", "map",
                "filter", "reduce", "promise", "catch()", "reject"],

            ["serpiente python", "java", "🪐", "Carlos++", "MarcosDB", "Dominio del DOM", "Carlos++",
                "html", "css", "typescript", "Pablo#", "Chat gpt", "Macallan", "👽",
                "❓", "Pablo#", "Use", "MarcosDB", "Thor", "esvastik", "Hellow, Wordl!", "caca",
                "haskell", "ironHack", "caca","🎃"]
        ];



        this.lastSpawnTime = 0;
        this.spawnInterval = 3000;
        this.wordSpeed = 2;
        this.animationId = null;

        this.update();

    }



    updateWordSpeed(score) {
        if (score >= 2) {
            this.wordSpeed = 7; 
        }
    }

    createAndMoveWord() {
        const randomWord = this.getRandomWord();
        const posX = Math.random() * (this.container.offsetWidth - this.width);
        const posY = -this.height;
        const wordElement = this.createWordElement(randomWord, posX, posY);

        this.container.appendChild(wordElement);
        this.activeWords.push({ element: wordElement, posY, speed: this.wordSpeed, name: randomWord });
    }

    stop() {
        window.cancelAnimationFrame(this.animationId);
    }


    update() {

        this.updateWordSpeed(this.player.score);

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
                this.container.removeChild(word.element);
                this.activeWords.splice(i, 1);
            }

            if (word.posY > this.container.offsetHeight) {
                this.container.removeChild(word.element);
                this.activeWords.splice(i, 1);
            }

            this.player.bullets.forEach((bullet) => {
                if (bullet.checkCollision(word.element)) {
                    bullet.showExplosion(
                        word.element.offsetLeft,
                        word.element.offsetTop,
                        word.element.offsetWidth,
                        word.element.offsetHeight
                    );
                    bullet.element.remove()
                    word.element.remove()
                    this.activeWords = this.activeWords.filter(activeWord => activeWord !== word)
                    window.cancelAnimationFrame(bullet.animationId)
                    this.player.bullets = this.player.bullets.filter(activeBullet => activeBullet !== bullet)

                    if (this.allWords[0].includes(word.name)) {
                        this.player.updateScore();
                        if (this.player.score >= 5) {
                            document.getElementById("you-win").style.display = "block";
                            document.getElementById("restart-button").style.display = "flex"
                            clearInterval(window.timerInterval);
                        }
                    } else {
                        this.player.updateLives();
                        
                    }
                }
            });

        }

        this.animationId = requestAnimationFrame(() => this.update());
    }

    getRandomWord() {
        const wordSet = this.allWords[Math.floor(Math.random() * this.allWords.length)];
        return wordSet[Math.floor(Math.random() * wordSet.length)];
    }

    createWordElement(word, posX, posY) {
        const wordElement = document.createElement("div");
        wordElement.textContent = word;
        wordElement.style.color = "green";
        wordElement.style.fontFamily = "Arial";
        wordElement.style.fontSize = "24px";
        wordElement.style.position = "absolute";
        wordElement.style.left = posX + "px";
        wordElement.style.top = posY + "px";
        wordElement.style.transition = "color 2s";
        wordElement.style.color = "yellow";
        wordElement.style.textShadow = "-8px -8px 10px rgba(0, 0, 255, 0.8), 8px -8px 10px rgba(0, 0, 255, 0.8), -8px 8px 10px rgba(0, 0, 255, 0.8), 8px 8px 10px rgba(0, 0, 255, 0.8)";


        setTimeout(() => {
            wordElement.style.color = "red";
        }, 2000);

        return wordElement;
    }
}




