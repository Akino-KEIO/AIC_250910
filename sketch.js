let particles = [];
const numParticles = 150;
let currentBgColor; // This will hold the current background color

const particleColors = [
  '#f06292', // Medium Pink
  '#42a5f5', // Medium Blue
  '#ffee58', // Medium Yellow
  '#66bb6a', // Medium Green
  '#ffa726', // Medium Orange
  '#ab47bc', // Medium Purple
  '#26c6da'  // Medium Cyan
];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas-container');
  
  // Set the initial background color
  currentBgColor = color(getComputedStyle(document.documentElement).getPropertyValue('--bg-color-base').trim());

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(currentBgColor);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    particles[i].edges();

    for (let j = i + 1; j < particles.length; j++) {
      const d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < 150) {
        strokeWeight(2.5); // Set line thickness to 2.5px
        stroke(150, 150, 150, map(d, 0, 150, 100, 0));
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.5, 1.5));
    this.baseSize = random(9, 27);
    this.size = this.baseSize;
    this.sizeOffset = random(0, TWO_PI);
    this.color = color(random(particleColors));
    this.color.setAlpha(200);
  }

  update() {
    this.pos.add(this.vel);
    const sizeChange = sin(frameCount * 0.04 + this.sizeOffset);
    this.size = this.baseSize + sizeChange * (this.baseSize / 2);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
}