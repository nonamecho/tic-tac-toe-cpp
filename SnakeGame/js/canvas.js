class Canvas {
  constructor() {
    /**@type {HTMLCanvasElement} */
    this.c = document.getElementById("myCanvas");
    this.ctx = this.c.getContext("2d");
    this.c.width = WIDTH;
    this.c.height = HEIGHT;
  }

  reset() {
    this.ctx.reset();
  }

  drawFrame() {
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  }

  drawTaget(target) {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(target.x, target.y, OBJECT_SIZE, OBJECT_SIZE);
  }

  drawSnake(snakeObjs) {
    this.ctx.fillStyle = "green";
    snakeObjs.forEach((snakeObj) => {
      this.ctx.fillRect(snakeObj.x, snakeObj.y, OBJECT_SIZE, OBJECT_SIZE);
    });
  }
}
