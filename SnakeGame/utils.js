function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calNextTarget() {
  return {
    x: getRandomInt(WIDTH / 2 - OBJECT_SIZE),
    y: getRandomInt(HEIGHT / 2 - OBJECT_SIZE),
  };
}

function checkIfCollideTarget(x, y, snakeHead, direction) {
  let nextX = snakeHead.x;
  let nextY = snakeHead.y;
  switch (direction) {
    case "r":
      nextX = snakeHead.x + 1;
      break;
    case "l":
      nextX = snakeHead.x - 1;
      break;
    case "d":
      nextY = snakeHead.y + 1;
      break;
    case "u":
      nextY = snakeHead.y - 1;
      break;
    default:
      console.error("unsupportted move direction", direction);
  }
  return (
    (nextX + 1 >= x &&
      nextX + 1 <= x + OBJECT_SIZE &&
      nextY + 1 >= y &&
      nextY + 1 <= y + OBJECT_SIZE) ||
    (nextX + OBJECT_SIZE - 1 >= x &&
      nextX + OBJECT_SIZE - 1 <= x + OBJECT_SIZE &&
      nextY + OBJECT_SIZE - 1 >= y &&
      nextY + OBJECT_SIZE - 1 <= y + OBJECT_SIZE)
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
    snakeHead.x >= WIDTH ||
    snakeHead.y <= 0 ||
    snakeHead.y >= HEIGHT
  );
}

function calSnakeObj(snakeObj, direction) {
  let newX = snakeObj.x;
  let newY = snakeObj.y;
  switch (direction) {
    case "r":
      if (newX >= WIDTH) {
        newX = 0;
      } else {
        newX += OBJECT_SIZE;
      }
      break;
    case "l":
      if (newX <= 0) {
        newX = WIDTH;
      } else {
        newX -= OBJECT_SIZE;
      }
      break;
    case "u":
      if (newY <= 0) {
        newY = HEIGHT;
      } else {
        newY -= OBJECT_SIZE;
      }
      break;
    case "d":
      if (newY >= HEIGHT) {
        newY = 0;
      } else {
        newY += OBJECT_SIZE;
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
        y: lastSnakeObj.y + OBJECT_SIZE,
        step: lastSnakeObj.step - 1,
      };
    case "d":
      return {
        ...lastSnakeObj,
        y: lastSnakeObj.y - OBJECT_SIZE,
        step: lastSnakeObj.step - 1,
      };
    case "l":
      return {
        ...lastSnakeObj,
        x: lastSnakeObj.x + OBJECT_SIZE,
        step: lastSnakeObj.step - 1,
      };
    case "r":
      return {
        ...lastSnakeObj,
        x: lastSnakeObj.x - OBJECT_SIZE,
        step: lastSnakeObj.step - 1,
      };
    default:
      console.error("unsupportted move direction", lastSnakeObjDirection);
  }
}
