const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
c.width = 600;
c.height = 600;

let start = true;
let catchMove = null;
let steps = ["r"];
let objectSize = 10;
let speed = 10;

let snakeObjs = [
  {
    x: c.width / 2,
    y: c.height / 2,
    step: 0,
  },
];

let target = {
  x: getRandomInt(c.width / 2 - objectSize),
  y: getRandomInt(c.height / 2 - objectSize),
};

function drawFrame() {
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, c.width, c.height);
}

function drawTaget() {
  ctx.fillStyle = "red";
  ctx.fillRect(target.x, target.y, objectSize, objectSize);
}

function drawSnake() {
  ctx.fillStyle = "green";
  snakeObjs.forEach((snakeObj) => {
    ctx.fillRect(snakeObj.x, snakeObj.y, objectSize, objectSize);
  });
}

function draw() {
  ctx.reset();
  drawFrame();
  drawTaget();

  // update snakeObjs
  snakeObjs = snakeObjs.map((snakeObj) => calMove(snakeObj));
  drawSnake();

  if (checkIfCollideSelf(snakeObjs) || checkIfCollideWall(snakeObjs)) {
    // end game
    start = false;
  }

  if (checkIfCollideTarget(target.x, target.y, snakeObjs)) {
    target = calNextTarget();
    snakeObjs.push(calNewMove());
  }

  if (catchMove) {
    steps.push(catchMove);
    catchMove = null;
  } else {
    steps.push(steps[steps.length - 1]);
  }
  snakeObjs = snakeObjs.map((snakeObj) => ({
    ...snakeObj,
    step: snakeObj.step + 1,
  }));
  if (start) {
    setTimeout(() => {
      window.requestAnimationFrame(draw);
    }, 500 / speed);
  }
}

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (steps[snakeObjs[0].step] != "d") {
        catchMove = "u";
      }
      break;
    case "ArrowDown":
      if (steps[snakeObjs[0].step] != "u") {
        catchMove = "d";
      }
      break;
    case "ArrowLeft":
      if (steps[snakeObjs[0].step] != "r") {
        catchMove = "l";
      }
      break;
    case "ArrowRight":
      if (steps[snakeObjs[0].step] != "l") {
        catchMove = "r";
      }
      break;
    default:
      console.log("absorb unsupported keydown event", e);
  }
});
draw();
