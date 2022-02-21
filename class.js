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
    this.h = h,
    this.bg = color(0,0,0,1),
    this.fg = color(0,255,0,1)
  }

  update(color) {

  }

  draw() {
    stroke(255, 0, 0)
    noStroke()
    fill(this.bg)
    rect(this.x, this.y, this.w, this.h)
    fill(random(255))
    // fill(this.fg.r, random(this.fg.g), this.fg.b, this.fg.a)
    ellipse(this.x, this.y, this.w, this.h)
  }
}
