const CANVAS = new Canvas();
const GAME = new Game();

function main() {
  GAME.next();
  CANVAS.reset();
  CANVAS.drawTaget(GAME.target);
  CANVAS.drawSnake(GAME.snakeObjs);
  if (!GAME.checkIfCollideWall() && !GAME.checkIfCollideSelf()) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / SPEED);
  }
}

main();
