const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particleArr = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const mouse = {
  x: undefined,
  y: undefined,
};

const handleParticles = () => {
  for (let i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
    particleArr[i].draw();

    for (let j = i; j < particleArr.length; j++) {
      const dx = particleArr[i].x - particleArr[j].x;
      const dy = particleArr[i].y - particleArr[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArr[i].color;
        ctx.lineWidth = particleArr[i].size / 15;
        ctx.moveTo(particleArr[i].x, particleArr[i].y);
        ctx.lineTo(particleArr[j].x, particleArr[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particleArr[i].size <= 0.3) {
      particleArr.splice(i, 1);
      console.log(particleArr.length);
      i--;
    }
  }
};

// const init = () => {
//   for (let i = 0; i < 100; i++) {
//     particleArr.push(new Particle());
//   }
// };

// init();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i <= 25; i++) {
    particleArr.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i <= 5; i++) {
    particleArr.push(new Particle());
  }
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 0.5;
  requestAnimationFrame(animate);
};

animate();
