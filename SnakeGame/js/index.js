const GAME = new Game();

function main(timestamp) {
  GAME.update(timestamp);
  GAME.draw();

  window.requestAnimationFrame(main);
}

main(0);
