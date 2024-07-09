class Game {
  constructor() {
    this.steps = ["r"];
    this.snakeObjs = [
      {
        x: WIDTH / 2,
        y: HEIGHT / 2,
      },
    ];
    this.target = calNextTarget();
  }

  getSnakeHeadDirection() {
    return this.steps[this.steps.length - 1];
  }

  clearSteps() {
    this.steps.slice(
      this.steps.length - this.snakeObjs.length,
      this.steps.length - 1
    );
  }

  checkIfCollideTarget() {
    return checkIfCollideTarget(
      this.target.x,
      this.target.y,
      this.snakeObjs[0],
      this.getSnakeHeadDirection()
    );
  }

  checkIfEnd() {
    return (
      checkIfCollideSelf(this.snakeObjs, this.getSnakeHeadDirection()) ||
      checkIfCollideWall(this.snakeObjs[0])
    );
  }

  updateSnakeObjs() {
    this.snakeObjs = this.snakeObjs.map((snakeObj, i) =>
      calSnakeObj(snakeObj, this.steps[this.steps.length - 1 - i])
    );
  }

  updateTarget() {
    this.target = calNextTarget();
  }

  addNewSnakeObj() {
    this.snakeObjs.push(
      calNewSnakeObj(
        this.snakeObjs[this.snakeObjs.length - 1],
        this.steps[this.steps.length - this.snakeObjs.length]
      )
    );
  }

  next(catchMove) {
    if (this.checkIfCollideTarget()) {
      this.updateTarget();
      this.addNewSnakeObj();
    }
    if (catchMove) {
      this.steps.push(catchMove);
    } else {
      this.steps.push(this.getSnakeHeadDirection());
    }
    this.updateSnakeObjs();
    this.clearSteps();
  }
}

const GAME = new Game();
