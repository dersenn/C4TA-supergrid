// Canvas Vars
const container = document.getElementById('p5-container')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

// Global Vars
let nRows = 5
let nCols = 5

let tileMin = canW / 100
let tileMax = canW - ((nCols - 1) * tileMin)

let tileW = canW / nCols
let tileH = canH / nRows

let tiles = simpleGrid(0, 0, nCols, nRows, canW, canH, []) 


// Simple Grid Generator
function simpleGrid(zeroX, zeroY, gridCols, gridRows, gridW, gridH, arr) {
    let tileW = gridW / gridCols
    let tileH = gridH / gridRows

    let myTiles = arr
    for (let y = 0; y < gridRows; y++) {
        myTiles[y] = []
        let yOff = zeroY + (y * tileH)
        for (let x = 0; x < gridCols; x++) {
            let xOff = zeroX + (x * tileW)
            myTiles[y].push( new Tile(x, y, xOff, yOff, tileW, tileH))
        }
    }
    return myTiles
}



// p5 Setup
function setup() {
  // setup canvas in container
  let canvas = createCanvas(canW, canH)
  canvas.parent(container)

  ellipseMode(CORNER)

}

// console.log(tiles)

let set = {
  ampT: .005,
  ampX: .1,
  ampY: .1
} //settings


// p5 Draw
function draw() {
  background(0)
  let speed = frameCount * set.ampT

  let newY = 0
  let restY = canH

  let totY = 0
  for (let nX = 0; nX < tiles.length; nX++) {
    totY += noise(nX, nX * set.ampY, speed)
  }

  for (let x = 0; x < tiles.length; x++) {

    let newX = 0
    let restX = canW
    let newH //= map(w, 0, totY, 0, canH)

    // pre-calculating the total width of all the noise values.
    // isn't there a better way?
    let totX = 0
    for (let nY = 0; nY < tiles[x].length; nY++) {
      totX += noise(x * set.ampX, nY * set.ampY, speed)
    }

    for (let y = 0; y < tiles[x].length; y++) {

      let w = noise(x * set.ampX, y * set.ampY, speed)
      // console.log(n)
      let newW = map(w, 0, totX, 0, canW)
      // newH = map(w, 0, totY, 0, canH)

      let tile = tiles[x][y]
      tile.update(newX, newY, newW, newH, w)
      tile.draw()

      newX += newW
      restX -= newW
    }

    newY += newH
    restY -= newH
  }

}





function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}




// my only friend, the end.