class Tail extends Entity {
  constructor(x, y, segments, gap, pinoffset, verlyInstance) {
    super(16, verlyInstance);
    this.points = [];
    this.sticks = [];

    this.x = x;
    this.y = y;
    this.segments = segments;
    this.gap = gap;
    this.pinoffset = pinoffset;

    this.createRope();
  }

  createRope() {
    for (let i = 0; i < this.segments; i++) {
      this.addPoint(this.x + i * this.gap, this.y, 0, 0).setFriction(0.75)
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.addStick(i, (i + 1) % this.segments).setColor('#35ebbe');
    }
    if (this.pin !== undefined) this.pin(this.pinoffset);
    return this;
  }

  renderPoints() { }
}