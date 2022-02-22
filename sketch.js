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
  nCols: 1,
  nRows: 1,
  guides: false,
  orbit: false
}

let theGrid = new superGrid(zero.x, zero.y, canW, canH, set.nCols, set.nRows)
// console.log(theGrid)

let tiles = []

// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH, WEBGL)
  canvas.parent(container)

  ellipseMode(CORNER)
}


// p5 Draw
function draw() {
  background(0)

  if (set.orbit) {
    orbitControl(1,1)
  }

  tiles = recursiveGrid(theGrid.x, theGrid.y, theGrid.c, theGrid.r, theGrid.w, theGrid.h, 1, 1, [])
  // console.log(tiles)

  for (let t = 0; t < tiles.length; t++) {
    tiles[t].draw()
  }

  if (set.guides) {
    drawGuides(zero, theGrid.c, theGrid.r)
  }
  // drawCenter()

  console.log(set.slide, theGrid.c, theGrid.r, 'looping: ' + looping)
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


  if (keyCode === RIGHT_ARROW) {
    theGrid.c++
  } else if (keyCode === LEFT_ARROW) {
    if (theGrid.c > 1) {
      theGrid.c--
    }
  } else if (keyCode === DOWN_ARROW) {
    theGrid.r++
  } else if (keyCode === UP_ARROW) {
    if (theGrid.r > 1) {
      theGrid.r--
    }
  }
}


function drawCenter() {
  fill(255, 0, 0)
  ellipse(zero.x,zero.y,20,20)
}


// my only friend, the end.