/**
 * @name Parasites
 * @author <hazru.anurag@gmail.com>
 * @site https://anuraghazra.github.io/
 */
let width;
let height
let canvas;
let ctx;
let verly;
let mouseX;
let mouseY;
const FLEE_RADIUS = 100;
window.onload = function () {
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight - 5;

  let boids = [];
  for (let i = 0; i < 70; i++) {
    boids.push(new Boid(Math.random() * width, Math.random() * height, 5))
  }
  
  verly = new Verly(16);

  // mouse 
  window.addEventListener('mousemove', function(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY
  })


  function animate() {
    let grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
    grd.addColorStop(0, "rgba(25, 25, 25, 1)");
    grd.addColorStop(1, "rgba(0, 0, 25, 1)");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    for (const b of boids) {
      b.update()
      b.applyFlock(boids);
      b.boundaries();
      b.render(ctx);
    }
    verly.update();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255, 0.2)';
    ctx.arc(mouseX, mouseY, FLEE_RADIUS, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    requestAnimationFrame(animate);
  }
  animate();

}