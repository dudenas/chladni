// const _clrs = [
//   [0, 0, 0],
//   [99, 29, 99],
//   [180, 61, 43],
//   [255, 128, 0],
//   [212, 212, 212]
// ]

const _clrs = [
  [0, 0, 0],
  [99, 29, 99],
  [180, 61, 43],
  [255, 128, 0],
]

// chladni 2D closed-form solution - returns between -1 and 1
const chladni = (x, y, a, b, m, n) =>
  a * sin(PI * n * x) * sin(PI * m * y) +
  b * sin(PI * m * x) * sin(PI * n * y);

/* Particle dynamics */

class Particle {

  constructor() {
    this.x = random(0, 1);
    this.y = random(0, 1);
    this.stochasticAmplitude;

    // this.color = _clrs[0];
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
    this.x += random(-this.stochasticAmplitude, this.stochasticAmplitude);
    this.y += random(-this.stochasticAmplitude, this.stochasticAmplitude);

    this.updateOffsets();
  }

  updateColor() {
    this.idx = ceil(map(this.y, 0, 1, 0, _clrs.length - 1))
    if (random(1) > .8) this.idx = floor(random(_clrs.length))
    this.color = _clrs[this.idx]
  }

  updateOffsets() {
    // handle edges
    if (this.x <= 0) this.x = 0;
    if (this.x >= 1) this.x = 1;
    if (this.y <= 0) this.y = 0;
    if (this.y >= 1) this.y = 1;

    // convert to screen space
    this.xOff = width * this.x; // (this.x + 1) / 2 * width;
    this.yOff = height * this.y; // (this.y + 1) / 2 * height;
  }

  show() {
    stroke(...this.color);
    point(this.xOff, this.yOff)
    // point(this.xOff + height, this.yOff)
    // point(this.xOff + height * 2, this.yOff)
  }
}