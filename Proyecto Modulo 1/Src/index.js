window.addEventListener("load", () => {
    const container = document.getElementById("game-board");
    const game = new Game(container);

    document.addEventListener('mousemove', (e) => {
        game.player.move(e);
    })

    document.addEventListener('click', (e) => {
        game.player.shoot();
    })
});