let particles, sliders, m, n, v, N;

// chladni frequency params
let a, b

// vibration strength params
let minWalk = 0.0025;
let _changed = false

const settings = {
  nParticles: 10000,
  canvasSize: [1200, 580],
}

function windowResized() {
  const w = min(windowWidth, 1200)
  let h = 580
  if (w < 580) {
    h = w
  }
  resizeCanvas(w, h);
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
  clear()
  // background(255);
  stroke(0);
}

const checkToggle = () => {
  $("#toggle-switch").on('change', function () {
    if ($(this).is(':checked')) {
      switchStatus = $(this).is(':checked');
      $("body").css("background-color", "rgb(33, 33, 33)")
      _clrs[0] = [212, 212, 212]
      for (let particle of particles) {
        particle.color = _clrs[particle.idx]
      }
    } else {
      switchStatus = $(this).is(':checked');
      $("body").css("background-color", "white")
      _clrs[0] = [0, 0, 0]
      for (let particle of particles) {
        particle.color = _clrs[particle.idx]
      }
    }
  });
}


/* Timing */
// run at DOM load
function setup() {
  DOMinit();
  setupParticles();
  checkToggle();
}
// run each frame
function draw() {
  wipeScreen();
  updateParams();
  moveParticles();
}