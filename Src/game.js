class Game {
    constructor(container, selectedCharacter = 'nave') {
        this.container = container;
        this.player = new Player(this.container, selectedCharacter);
        this.words = new Words(this.container, this.player);
    }

}