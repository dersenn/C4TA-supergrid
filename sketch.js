// Canvas Vars
const container = document.getElementById('p5-container')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

// PRELOAD
  // SETTINGS.JSON
  // SLIDES.JSON
  // FONTS?


// Global Vars
let zero = {
  x: -canW/2,
  y: -canH/2,
  z: 0
}


// presentation vars
let slide = 0
let looping = true


// settings
let set = {
  slide: slide,
  c: 1,
  r: 1,
  guides: true,
  orbit: false,
  initLevel: 1,
  maxLevel: 3,
  subdivide: false,
  fps: 5,
  fill: false
}

let grid
// let grid = new superGrid(zero.x, zero.y, canW, canH, set)

let tiles = []

// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH, WEBGL)
  canvas.parent(container)

  frameRate(set.fps)

  makeGrid()
  // makeTiles()

  ellipseMode(CORNER)
}


// p5 Draw
function draw() {
  background(0)
  frameRate(set.fps)

  if (set.orbit) {
    orbitControl(1,1)
  }

  for (let t = 0; t < tiles.length; t++) {
    tiles[t].update(set.fill, frameCount, t)
    tiles[t].draw(frameCount)
  }

  if (set.guides) {
    drawGuides(zero, grid.c, grid.r)
  }
  // drawCenter()

  makeGrid()
  // makeTiles()


  // console.log(set.slide, theGrid.c, theGrid.r, 'looping: ' + looping)
}


function mouseClicked() {
  // do shit with the tile
}

// slides control functions
function keyPressed() {
  // loop on/off
  if (key === 'l' && looping) {
    noLoop()
    looping = false
  } else if (key === 'l' && !looping) {
    loop()
    looping = true
  }

  // previous/next slide
  if (key === 'n') {
    set.slide++
  } else if (key === 'p') {
    if (set.slide > 0) {
      set.slide--
    }
  }

  // guides on/off
  if (key === 'g') {
    if (!set.guides) {
      set.guides = true
    } else {
      set.guides = false
    }
  }

  // orbit on/off
  if (key === 'o') {
    if (!set.orbit) {
      set.orbit = true 
    } else {
      set.orbit = false
    }
  }

  // subdivide on/off
  if (key === 's') {
    if (!set.subdivide) {
      set.subdivide = true 
    } else {
      set.subdivide = false
    }
  }

  // fill on/off
  if (key === 'f') {
    if (!set.fill) {
      set.fill = true 
    } else {
      set.fill = false
    }
  }

  // increase/decrease cols/rows
  if (keyCode === RIGHT_ARROW) {
    set.c++
    makeGrid()
  } else if (keyCode === LEFT_ARROW) {
    if (set.c > 1) {
      set.c--
      makeGrid()
    }
  } else if (keyCode === DOWN_ARROW) {
    set.r++
    makeGrid()
  } else if (keyCode === UP_ARROW) {
    if (set.r > 1) {
      set.r--
      makeGrid()
    }
  }
}

function makeGrid() {
  grid = new superGrid(zero.x, zero.y, canW, canH, set)
  makeTiles()
}

function makeTiles() {
  tiles = recursiveGrid(grid.x, grid.y, grid.c, grid.r, grid.w, grid.h, grid.initLevel, grid.maxLevel, [], 30)
}

function drawCenter() {
  fill(255, 0, 0)
  ellipse(zero.x,zero.y,20,20)
}


// my only friend, the end.