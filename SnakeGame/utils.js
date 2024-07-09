function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calNextTarget() {
  return {
    x: getRandomInt(c.width / 2 - objectSize),
    y: getRandomInt(c.height / 2 - objectSize),
  };
}

function checkIfCollideTarget(x, y, snakeHead, direction) {
  const nextX =
    direction == "r"
      ? snakeHead.x + 1
      : direction == "l"
      ? snakeHead.x - 1
      : snakeHead.x;
  const nextY =
    direction == "d"
      ? snakeHead.y + 1
      : direction == "u"
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

function checkIfCollideSelf(snakeObjs, direction) {
  for (let i = 1; i < snakeObjs.length; i++) {
    if (
      checkIfCollideTarget(
        snakeObjs[i].x,
        snakeObjs[i].y,
        snakeObjs[0],
        direction
      )
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
    snakeHead.y >= ctx.height
  );
}

function calSnakeObj(snakeObj, direction) {
  let newX = snakeObj.x;
  let newY = snakeObj.y;
  switch (direction) {
    case "r":
      if (newX >= c.width) {
        newX = 0;
      } else {
        newX += objectSize;
      }
      break;
    case "l":
      if (newX <= 0) {
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
      console.error("unsupportted move direction", direction);
  }
  return { x: newX, y: newY, step: snakeObj.step };
}

function calNewSnakeObj(lastSnakeObj, lastSnakeObjDirection) {
  switch (lastSnakeObjDirection) {
    case "u":
      return {
        ...lastSnakeObj,
        y: lastSnakeObj.y + objectSize,
        step: lastSnakeObj.step - 1,
      };
    case "d":
      return {
        ...lastSnakeObj,
        y: lastSnakeObj.y - objectSize,
        step: lastSnakeObj.step - 1,
      };
    case "l":
      return {
        ...lastSnakeObj,
        x: lastSnakeObj.x + objectSize,
        step: lastSnakeObj.step - 1,
      };
    case "r":
      return {
        ...lastSnakeObj,
        x: lastSnakeObj.x - objectSize,
        step: lastSnakeObj.step - 1,
      };
    default:
      console.error("unsupportted move direction", lastSnakeObjDirection);
  }
}
