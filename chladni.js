p5.disableFriendlyErrors = true; // disables FES
let particles, sliders, m, n, v, N;

// chladni frequency params
let a, b

// vibration strength params
const minWalk = 0.002;
let _changed = false
let _doubleGrfc = true
let _offset = 0
let w = 1200,
  h = 600

const settings = {
  nParticles: 7000,
  canvasSize: [w, h]
}

// resize window
function windowResized() {
  if (windowWidth <= 1200) {
    w = windowWidth
    if (w <= 600) {
      h = w
      _doubleGrfc = false
    } else {
      _doubleGrfc = true
    }
  }
  _offset = abs(w - h * 2) / 2
  resizeCanvas(w, h);
}

const _totalFrames = 150
/* Initialization */

const DOMinit = () => {
  let canvas = createCanvas(...settings.canvasSize, P2D);

  // resize window
  if (windowWidth <= 1200) {
    w = windowWidth
    if (w <= 600) {
      h = w
      _doubleGrfc = false
    }
  }
  _offset = abs(w - h * 2) / 2

  resizeCanvas(w, h);
  canvas.parent('sketch-container');
  // frameRate(30)

  a = random(0.75, 1.25)
  b = random(0.75, 1.25)
  strokeWeight(1)
}

const setupParticles = () => {
  // particle array
  particles = [];
  for (let i = 0; i < settings.nParticles; i++) {
    particles[i] = new Particle();
  }

  particles.sort(compare);
}

// sort
const compare = (a, b) => {
  if (a.idx < b.idx) {
    return -1;
  }
  if (a.idx > b.idx) {
    return 1;
  }
  return 0;
}

const pickRandomValues = () => {
  n = floor(random(1, 11))
  m = floor(random(1, 11))
  while (n == m) {
    m = floor(random(1, 11))
  }
}

const updateParams = () => {
  if (frameCount == 1) {
    pickRandomValues()
  }
  // take percent that would rule the fucking animation
  let percent = (frameCount % _totalFrames) / _totalFrames;
  // velocity or the speed of the particle
  v = map(Math.sin(percent * Math.PI * 2), -1, 1, -0.05, 0.05)
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
  let curr = 0
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i]
    // change color only once for all particles
    if (i == particles.length / 5 * 4) {
      stroke(..._clrs[curr++])
    }
    if (i == particles.length / 5 * 3) {
      stroke(..._clrs[curr++])
    }
    if (i == particles.length / 5 * 2) {
      stroke(..._clrs[curr++])
    }
    if (i == particles.length / 5 * 1) {
      stroke(..._clrs[curr++])
    }
    // move and show particles
    particle.move();
    particle.show();
  }
}

const wipeScreen = () => {
  clear()
}


/* Timing */
// run at DOM load
function setup() {
  DOMinit()
  setupParticles()
}
// run each frame
function draw() {
  wipeScreen()
  updateParams()
  moveParticles()
}