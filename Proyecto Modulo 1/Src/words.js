class Words {
    constructor(container, playerPosY, playerHeight) {
        this.container = container;
        this.width = 54;
        this.height = 54;
       
        this.posY = playerPosY - playerHeight; 
        this.posX = this.randomIntFromInterval(0, container.offsetWidth - this.width); 
        this.velX = 3;
        this.allWords = [
            ["variable", "funcion", "if", "else", "for", "while", "console",
                "array", "object", "return", "true", "false", "null", "undefined",
                "class", "constructor", "prototype", "async", "await", "map",
                "filter", "reduce", "promise", "import", "export"],
            ["python", "java", "csharp", "ruby", "php", "swift", "cplusplus",
                "html", "css", "typescript", "scala", "kotlin", "rust", "perl",
                "sql", "go", "fortran", "lua", "cobol", "r", "matlab", "pascal",
                "haskell", "lisp", "prolog"]
        ];
        const category = Math.random() < 0.5 ? 0 : 1;
        this.palabraAleatoria = this.allWords[category][Math.floor(Math.random() * this.allWords[category].length)];
    };

      draw() {
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.backgroundSize = "cover";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.posX}px`;
        this.element.style.top = `${this.posY}px`;
        this.element.textContent = this.palabraAleatoria; 
        this.container.appendChild(this.element);
        
        this.move();
    };
    move() {
        this.posY += this.velX;
        this.element.style.top = `${this.posY}px`;
    
    };
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};    



