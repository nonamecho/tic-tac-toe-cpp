const GAME = new Game();

function main() {
  GAME.next();

  if (!GAME.checkIfCollideWall() && !GAME.checkIfCollideSelf()) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / SPEED);
  }
}

main();
