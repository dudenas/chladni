let particles, sliders, m, n, v, N;

// chladni frequency params
let a, b

// vibration strength params
let minWalk = 0.0025;
let _changed = false

const settings = {
  nParticles: 10000,
  canvasSize: [600, 600],
}

const _totalFrames = 210
/* Initialization */

const DOMinit = () => {
  let canvas = createCanvas(...settings.canvasSize, P2D);
  canvas.parent('sketch-container');

  a = random(0.5, 1.5),
  b = random(0.5, 1.5);
}

const setupParticles = () => {
  // particle array
  particles = [];
  for (let i = 0; i < settings.nParticles; i++) {
    particles[i] = new Particle();
  }
}

const pickRandomValues = () => {
  n = floor(random(1, 14))
  m = floor(random(1, 14))
  while (n == m) {
    m = floor(random(1, 14))
  }
  console.log(n, m)
}

const updateParams = () => {
  if (frameCount == 1) {
    pickRandomValues()
  }

  // take percent that would rule the fucking animation
  let percent = (frameCount % _totalFrames) / _totalFrames;
  // velocity or the speed of the particle
  v = map(sin(percent * TWO_PI), -1, 1, -0.05, 0.05)
  // update n and m values
  if (percent >= 0.5 && !_changed) {
    pickRandomValues()
    _changed = true
  } else if (percent < 0.5) {
    _changed = false
  }

}

const moveParticles = () => {
  // particle movement
  for (let particle of particles) {
    particle.move();
    particle.show();
  }
}

const wipeScreen = () => {
  background(255);
  stroke(0);
}


/* Timing */
// run at DOM load
function setup() {
  DOMinit();
  setupParticles();
}
// run each frame
function draw() {
  wipeScreen();
  updateParams();
  moveParticles();
}