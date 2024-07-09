function main() {
  GAME.next();
  if (!GAME.checkIfEnd()) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / SPEED);
  }
}

main();
