class Game {
    constructor(container) {
        this.container = container;
        this.player = new Player(this.container);
        this.words = new Words(this.container);



    }
}