function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calNextTarget() {
  return {
    x: getRandomInt(c.width / 2 - objectSize),
    y: getRandomInt(c.height / 2 - objectSize),
  };
}

function checkIfCollideTarget(x, y, moves) {
  const nextX =
    steps[moves[0].step] == "r"
      ? moves[0].x + 1
      : steps[moves[0].step] == "l"
      ? moves[0].x - 1
      : moves[0].x;
  const nextY =
    steps[moves[0].step] == "d"
      ? moves[0].y + 1
      : steps[moves[0].step] == "u"
      ? moves[0].y - 1
      : moves[0].y;
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

function checkIfCollideSelf(moves) {
  for (let i = 1; i < moves.length; i++) {
    if (checkIfCollideTarget(moves[i].x, moves[i].y, moves)) return true;
  }
  return false;
}

function checkIfCollideWall(moves) {
  return (
    moves[0].x <= 0 ||
    moves[0].x >= ctx.width ||
    moves[0].y <= 0 ||
    moves[0] >= ctx.height
  );
}

function calMove(move) {
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

function calNewMove() {
  const lastMove = moves[moves.length - 1];
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
