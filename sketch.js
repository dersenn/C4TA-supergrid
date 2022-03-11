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

let looping = true

let init = {
  c: 1,
  r: 1,
  initLevel: 1,
  depth: 3,
  subdivide: false,
  chance: 30,
  fill: false,
  shape: false,
  amp: 1,
  three: false
}

// settings
let set = {
  guides: true,
  orbit: false,
  fps: 60,
  speed: 0.01
}

let grid = new superGrid(zero.x, zero.y, canW, canH, init)

let lightSpeed = .02
let l1 = {} 
let l2 = {}


// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH, WEBGL)
  canvas.parent(container)

  grid.makeGrid()
  console.log('SUPERGRID READY!')

  ellipseMode(CORNER)
}


// p5 Draw
function draw() {
  background(0)
  frameRate(set.fps)

  if (set.orbit) {
    orbitControl(1,1,.1)
  }

  if (grid.set.three) {
    l1.x = map(cos(frameCount * lightSpeed),-1,1,-width, width)
    l1.y = map(sin(frameCount) * lightSpeed,-1,1,-height, height)
    l2.x = map(sin(frameCount) * lightSpeed,-1,1,-width, width)
    l2.y = map(cos(frameCount * set.speed),-1,1,-height, height)

    pointLight(0, 255, 0, l1.x, l1.y, 0)
    pointLight(255, 0, 0, l2.x, l2.y, 0)

    // pointLight(255, 0, 0, 0, 0, 0)
  }


  for (let t = 0; t < grid.tiles.length; t++) {
    let tile = grid.tiles[t]
    tile.update(frameCount, set.speed)
    tile.draw()
    if (grid.subdivide && set.guides) {
      push()
      stroke(0,255,0)
      noFill()
      rect(tile.x, tile.y, tile.w, tile.h)
      pop()
    }
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
    if (!grid.subdivide) {
      grid.subdivide = true
      console.log('subdivide on')
   } else {
      grid.subdivide = false
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