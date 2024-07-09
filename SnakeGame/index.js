let start = true;
let catchMove = null;

function main() {
  GAME.next(catchMove);
  catchMove = null;

  CANVAS.reset();
  CANVAS.drawFrame();
  CANVAS.drawTaget(GAME.target);
  CANVAS.drawSnake(GAME.snakeObjs);

  if (GAME.checkIfEnd()) {
    start = false;
  }

  if (start) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / SPEED);
  }
}

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (GAME.getSnakeHeadDirection() != "d") {
        catchMove = "u";
      }
      break;
    case "ArrowDown":
      if (GAME.getSnakeHeadDirection() != "u") {
        catchMove = "d";
      }
      break;
    case "ArrowLeft":
      if (GAME.getSnakeHeadDirection() != "r") {
        catchMove = "l";
      }
      break;
    case "ArrowRight":
      if (GAME.getSnakeHeadDirection() != "l") {
        catchMove = "r";
      }
      break;
    default:
      console.log("absorb unsupported keydown event", e);
  }
});

main();
