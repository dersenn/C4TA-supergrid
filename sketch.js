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

let slide = 0

// settings
let set = {
  slide: slide,
  nCols: 1,
  nRows: 1
}

// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH, WEBGL)
  canvas.parent(container)
}


// p5 Draw
function draw() {
  background(0)



  drawGuides(zero, set.nCols, set.nRows)
  // drawCenter()

  console.log(set.slide, set.nCols, set.nRows)
}


function mouseClicked() {
  // do shit with the tile
}


function keyPressed() {

  // previous/nex slide
  if (key === 'n') {
    set.slide++
  } else if (key === 'p') {
    if (set.slide > 0) {
      set.slide--
    }
  }


  if (keyCode === RIGHT_ARROW) {
    set.nCols++
  } else if (keyCode === LEFT_ARROW) {
    if (set.nCols > 0) {
      set.nCols--
    }
  } else if (keyCode === DOWN_ARROW) {
    set.nRows++
  } else if (keyCode === UP_ARROW) {
    if (set.nRows > 0) {
      set.nRows--
    }
  }
}


function drawCenter() {
  fill(255, 0, 0)
  ellipse(zero.x,zero.y,20,20)
}


// my only friend, the end.