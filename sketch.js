// Canvas Vars
const container = document.getElementById('p5-container')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side


// Global Vars
let zero = {
  x: -canW/2,
  y: -canH/2,
  z: -canMin/2
}

// presentation vars
let looping = true

let init = {
  c: 3,
  r: 3,
  initLevel: 1,
  depth: 3,
  subdivide: false,
  chance: 50,
  fill: true,
  type: 'noise',
  shape: 'switch',
  color: false,
  amp: .2,
  three: true
}

// settings
let set = {
  guides: true,
  orbit: false,
  fps: 60,
  speed: 0.01
}

let grid = new superGrid(zero.x, zero.y, canW, canH, init)


// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH, WEBGL)
  canvas.parent(container)

  grid.makeGrid()
  console.log(grid)

  ellipseMode(CORNER)
}


// p5 Draw
function draw() {
  background(0)
  frameRate(set.fps)

  if (set.orbit) {
    orbitControl(1,1,.1)
  }

  for (let t = 0; t < grid.tiles.length; t++) {
    let tile = grid.tiles[t]
    tile.update(frameCount, set.speed)
    tile.draw()
  }

  if (set.guides) {
    drawGuides(zero, grid.set.c, grid.set.r)
  }

}


// controls
function keyPressed() {
  // loop on/off
  if (key === 'l' && looping) {
    noLoop()
    looping = false
    console.log('loop off')
  } else if (key === 'l' && !looping) {
    loop()
    looping = true
    console.log('loop on')
  }

  // guides on/off
  if (key === 'g') {
    if (!set.guides) {
      set.guides = true
      console.log('guides on')
   } else {
      set.guides = false
      console.log('guides off')
    }
  }

  // orbit on/off
  if (key === 'o') {
    if (!set.orbit) {
      set.orbit = true 
      console.log('orbit control on')
   } else {
      set.orbit = false
      console.log('orbit control off')
    }
  }

  // subdivide on/off
  if (key === 's') {
    if (!grid.set.subdivide) {
      grid.set.subdivide = true
      console.log('subdivide on')
   } else {
      grid.set.subdivide = false
      console.log('subdivide off')
    }
  }

  // fill on/off
  if (key === 'f') {
    if (!grid.set.fill) {
      grid.set.fill = true 
      console.log('fill on')
   } else {
      grid.set.fill = false
      console.log('fill off')
    }
  }

  // reload
 if (key === 'r') {
    grid.makeGrid()
  }

  // increase/decrease cols/rows
  if (keyCode === RIGHT_ARROW) {
    grid.set.c++
    grid.makeGrid()
  } else if (keyCode === LEFT_ARROW) {
    if (grid.set.c > 1) {
      grid.set.c--
      grid.makeGrid()
    }
  } else if (keyCode === DOWN_ARROW) {
    grid.set.r++
    grid.makeGrid()
  } else if (keyCode === UP_ARROW) {
    if (grid.set.r > 1) {
      grid.set.r--
      grid.makeGrid()
    }
  }
}


function drawCenter() {
  fill(255, 0, 0)
  ellipse(zero.x,zero.y,20,20)
}


// my only friend, the end.