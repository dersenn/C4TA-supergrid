class superGrid {
  constructor(x, y, w, h, settings) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.set = settings
    this.c = this.set.c
    this.r = this.set.r
    this.subdivide = this.set.subdivide
    this.initLevel = this.set.initLevel
    this.maxLevel = this.subdivide ? this.set.maxLevel : 1

    // this.maxLevel = this.set.maxLevel,
    this.tiles = []
  }


  // HOW DO I INTEGRATE THIS...
  createTiles() {
    this.tileW = this.w / this.c
    this.tileH = this.h / this.r
  }

  // Recursive Grid Generator
  // makeTiles(zeroX, zeroY, gridCols, gridRows, gridW, gridH, initLevel, maxLevel, arr, chance) {
  //   let tileW = gridW / gridCols
  //   let tileH = gridH / gridRows

  //   let myTiles = arr

  //   for (let x = 0; x < gridCols; x++) {
  //       let xOff = zeroX + (x * tileW)

  //           for (let y = 0; y < gridRows; y++) {
  //               let yOff = zeroY + (y * tileH)

  //               if (initLevel < maxLevel) {
  //                   if (coinToss(chance)) {
  //                       recursiveGrid(xOff, yOff, floor(random(1, gridCols)), floor(random(1, gridRows)), tileW, tileH, initLevel+1, maxLevel, myTiles, chance)
  //                   } else {
  //                       myTiles.push( new Tile(xOff, yOff, tileW, tileH))
  //                   }
  //               } else {
  //                   myTiles.push( new Tile(xOff, yOff, tileW, tileH))
  //               }

  //           }
  //   }
  //   return myTiles
  // }




}


class Tile {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.bg = color(0,0,0,1)
  }

  update(fill, f, t) {
    let n = noise(f * (t + 1)* .001, t * .0001)
    if (fill) {
      this.bg = n * 255//random(255)
    }
  }

  draw(f) {
    stroke(255, 0, 0)
    noStroke()
    fill(this.bg)
    rect(this.x, this.y, this.w, this.h)

  }
}
