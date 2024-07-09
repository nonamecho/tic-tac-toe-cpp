function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calNextTarget() {
  return {
    x: getRandomInt(c.width / 2 - objectSize),
    y: getRandomInt(c.height / 2 - objectSize),
  };
}

function checkIfCollideTarget(x, y, snakeHead, steps) {
  const nextX =
    steps[snakeHead.step] == "r"
      ? snakeHead.x + 1
      : steps[snakeHead.step] == "l"
      ? snakeHead.x - 1
      : snakeHead.x;
  const nextY =
    steps[snakeHead.step] == "d"
      ? snakeHead.y + 1
      : steps[snakeHead.step] == "u"
      ? snakeHead.y - 1
      : snakeHead.y;
  return (
    (nextX + 1 >= x &&
      nextX + 1 <= x + objectSize &&
      nextY + 1 >= y &&
      nextY + 1 <= y + objectSize) ||
    (nextX + objectSize - 1 >= x &&
      nextX + objectSize - 1 <= x + objectSize &&
      nextY + objectSize - 1 >= y &&
      nextY + objectSize - 1 <= y + objectSize)
  );
}

function checkIfCollideSelf(snakeObjs, steps) {
  for (let i = 1; i < snakeObjs.length; i++) {
    if (
      checkIfCollideTarget(snakeObjs[i].x, snakeObjs[i].y, snakeObjs[0], steps)
    )
      return true;
  }
  return false;
}

function checkIfCollideWall(snakeHead) {
  return (
    snakeHead.x <= 0 ||
    snakeHead.x >= ctx.width ||
    snakeHead.y <= 0 ||
    snakeHead >= ctx.height
  );
}

function calMove(move, steps) {
  console.info(steps);
  let newX = move.x;
  let newY = move.y;
  switch (steps[move.step]) {
    case "r":
      if (newX >= c.width) {
        newX = 0;
      } else {
        newX += objectSize;
      }
      break;
    case "l":
      if (move.x <= 0) {
        newX = c.width;
      } else {
        newX -= objectSize;
      }
      break;
    case "u":
      if (newY <= 0) {
        newY = c.height;
      } else {
        newY -= objectSize;
      }
      break;
    case "d":
      if (newY >= c.height) {
        newY = 0;
      } else {
        newY += objectSize;
      }
      break;
    default:
      console.error("unsupportted move direction", steps[move.step]);
  }
  return { x: newX, y: newY, step: move.step };
}

function calNewSnakeObj(snakeObjs, steps) {
  const lastMove = snakeObjs[snakeObjs.length - 1];
  switch (steps[lastMove.step]) {
    case "u":
      return {
        ...lastMove,
        y: lastMove.y + objectSize,
        step: lastMove.step - 1,
      };
    case "d":
      return {
        ...lastMove,
        y: lastMove.y - objectSize,
        step: lastMove.step - 1,
      };
    case "l":
      return {
        ...lastMove,
        x: lastMove.x + objectSize,
        step: lastMove.step - 1,
      };
    case "r":
      return {
        ...lastMove,
        x: lastMove.x - objectSize,
        step: lastMove.step - 1,
      };
    default:
      console.error("unsupportted move direction", steps[lastMove.step]);
  }
}
