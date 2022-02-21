class superGrid {
  constructor(x, y, w, h, cols, rows) {
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h,
    this.c = cols,
    this.r = rows,
    this.initLevel = 0,
    this.maxLevel = 0
  }
}


class Tile {
  constructor(x, y, w, h) {
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h
  }

  update() {
  }

  draw() {
    stroke(255, 0, 0)
    fill(0)
    rect(this.x, this.y, this.w, this.h)
  }
}
