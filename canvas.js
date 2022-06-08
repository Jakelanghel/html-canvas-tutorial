const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const drawCircle = () => {
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.fill();
};

const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  drawCircle();
});
