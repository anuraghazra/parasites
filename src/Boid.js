class Boid {
  constructor(x, y, radius, verly) {
    this.pos = new Vector(x, y);
    this.acc = new Vector(0, 0);
    this.vel = Vector.random2D(0, 0);
    this.vel.mult(10);

    this.radius = radius || 5;
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.mass = 0.2;

    this.flock = new Flock(this);
    this.flockMultiplier = {
      separate: 2.0,
      align: 1.2,
      cohesion: 1.3,
      wander: 0.5
    };

    let names = [
      'hanna', 'mona', 'cutie',
      'sweety', 'sofia', 'rose',
      'laisy', 'daisy', 'mia',
      'joe', 'jim', 'kim',
      'keo', 'shaun', 'morgan',
      'jery', 'tom', 'anu',
      'brian', 'ninja', 'daniel'
    ];

    this.name = names[Math.floor(Math.random() * names.length)];

    this.tail = new Tail(
      this.pos.x,
      this.pos.y,
      Math.floor(random(5, 10)),
      Math.floor(random(5, 10)),
      0,
      verly
    );
    this.tail.setGravity(new Vector(0, 0))
  }


  /**
   * @method update()
   * updates velocity, position, and acceleration
   */
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.tail.update();
    this.tail.render();
    this.tail.points[0].pos.setXY(this.pos.x, this.pos.y)
  }


  /**
   * @method applyForce()
   * @param {Number} f 
   * applies force to acceleration
   */
  applyForce(f) { this.acc.add(f) }


  /**
   * @method boundaries()
   * check boundaries and limit agents within screen
   */
  boundaries() {
    let d = 100;
    let desire = null;
    if (this.pos.x < d) {
      desire = new Vector(this.maxSpeed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desire = new Vector(-this.maxSpeed, this.vel.y);
    }
    if (this.pos.y < d) {
      desire = new Vector(this.vel.x, this.maxSpeed);
    } else if (this.pos.y > height - d) {
      desire = new Vector(this.vel.x, -this.maxSpeed);
    }
    if (desire !== null) {
      desire.normalize();
      desire.mult(this.maxSpeed);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(0.10);
      this.applyForce(steer);
    }
  }


  /**
   * @method applyFlock()
   * @param {*} agents 
   * calculates all the flocking code apply it to the acceleration
   */
  applyFlock(agents) {
    let sep = this.flock.separate(agents);
    let ali = this.flock.align(agents);
    let coh = this.flock.cohesion(agents);
    let wander = this.flock.wander();
    let flee = this.flock.flee(new Vector(mouseX, mouseY))

    sep.mult(this.flockMultiplier.separate);
    ali.mult(this.flockMultiplier.align);
    coh.mult(this.flockMultiplier.cohesion);
    wander.mult(this.flockMultiplier.wander);
    flee.mult(50);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    this.applyForce(wander);
    this.applyForce(flee);
  }


  renderNames() {
    noStroke();
    fill(35);
    textAlign(CENTER);
    textSize(10)
    text(this.name, this.pos.x - this.radius, this.pos.y - this.radius - 5)
  }
  /**
   * Render Agent
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.beginPath();
    // ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.health})`;
    let angle = this.vel.heading();
    ctx.save();
    ctx.fillStyle = '#35eb35';
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(angle);
    ctx.arc(0, 0, 4, 0, Math.PI * 2)
    // ctx.moveTo(this.radius, 0);
    // ctx.lineTo(-this.radius, -this.radius + 2);
    // ctx.lineTo(-this.radius, this.radius - 4);
    // ctx.lineTo(this.radius, 0);
    ctx.fill();
    ctx.restore();

    ctx.closePath();
  }
}
