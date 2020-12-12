let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}
PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new PIXI.Application({
  width: 1200,
  height: 600,
  antialias: true,
  transparent: true,
  resolution: 1
})

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

// draw rectangle
let stage = new PIXI.Container()
const _objects = [];
const particles = []
// chladni frequency params
const a = 1,
  b = 1
const minWalk = 0.002
let n = Math.floor(Math.random() * 10 + 1)
let m = Math.floor(Math.random() * 10 + 1)
let v = 0.05

while (n == m) {
  m = Math.floor(Math.random() * 10 + 1)
}

// vibration strength params
setup()

function setupParticles(obj) {
  // particle array
  for (let i = 0; i < 15000; i++) {
    let obj = new PIXI.Graphics()
    obj.beginFill(0x000)
    obj.drawEllipse(0, 0, 1, 1)
    obj.endFill()
    particles[i] = new Particle(obj);
    _objects.push(obj)
    app.stage.addChild(obj);
  }

  // console.log()

  // particles.sort(compare);
}

function moveParticles() {
  // particle movement
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i]
    particle.move();
  }
}


function setup() {
  setupParticles()
  animate()
}

function animate() {
  // request for another frame
  requestAnimationFrame(animate)

  // do the magic here
  moveParticles()

  // render
  app.render(stage)
}