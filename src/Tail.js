class Tail extends Entity {
  constructor(x, y, segments, gap, pinoffset) {
    super();
    this.points = [];
    this.sticks = [];
    this.iterations = 16;

    this.x = x;
    this.y = y;
    this.segments = segments;
    this.gap = gap;
    this.pinoffset = pinoffset;

    this.createRope();
  }

  createRope() {
    for (let i = 0; i < this.segments; i++) {
      this.addPoint(this.x + i * this.gap, this.y, 0, 0)
    }

    for (let i = 0; i < this.segments - 1; i++) {
      this.addStick(i, (i + 1) % this.segments);
    }

    if (this.pin !== undefined) {
      this.pin(this.pinoffset);
    }
    return this;
  }

  renderPoints() {}
  // render() {
  //   for (let i = 0; i < this.sticks.length; i++) {
  //     this.sticks[i].color = '#35ebbe'
  //   }
  //   for (let i = 0; i < this.points.length; i++) {
  //     this.points[i].friction = 0.75;
  //   }
  // }
}