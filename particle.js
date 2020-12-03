const _clrs = [
  ['#3C3A55'],
  ['#54526A'],
  ['#6D6B80'],
  ['#232140']
]

// chladni 2D closed-form solution - returns between -1 and 1
const chladni = (x, y, a, b, m, n) =>
  a * Math.sin(Math.PI * n * x) * Math.sin(Math.PI * m * y) +
  b * Math.sin(Math.PI * m * x) * Math.sin(Math.PI * n * y);

/* Particle dynamics */

class Particle {

  constructor() {
    this.x = Math.random();
    this.y = Math.random();
    this.stochasticAmplitude;

    this.updateColor()

    this.updateOffsets();
  }

  move() {
    // what is our chladni value i.e. how much are we vibrating? (between -1 and 1, zeroes are nodes)
    let eq = chladni(this.x, this.y, a, b, m, n);

    // set the amplitude of the move -> proportional to the vibration
    this.stochasticAmplitude = v * abs(eq);

    if (this.stochasticAmplitude <= minWalk) this.stochasticAmplitude = minWalk;

    // perform one random walk
    this.x += (Math.random() - 0.5) * this.stochasticAmplitude * 2;
    this.y += (Math.random() - 0.5) * this.stochasticAmplitude * 2;

    this.updateOffsets();
  }

  updateColor() {
    this.idx = ceil(map(this.y, 0, 1, 0, _clrs.length - 1))
    if (Math.random() > .8) this.idx = floor(Math.random() * _clrs.length)
    this.color = _clrs[this.idx]
  }

  updateOffsets() {
    // handle edges
    if (this.x <= 0) this.x = 0;
    if (this.x >= 1) this.x = 1;
    if (this.y <= 0) this.y = 0;
    if (this.y >= 1) this.y = 1;

    // convert to screen space
    this.xOff = width * this.x;
    this.yOff = height * this.y;
  }

  show() {
    stroke(...this.color);
    point(this.xOff, this.yOff)
  }
}