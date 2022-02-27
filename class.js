class superGrid {
  constructor(x, y, w, h, init) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.set = init
    this.tiles
    this.fill = this.set.fill
    this.type = this.set.type
    this.shape = this.set.shape
  }

  makeGrid() {
    this.depth = this.set.subdivide ? this.set.depth : 1
    this.tiles = recursiveGrid(this.x, this.y, this.set.c, this.set.r, this.w, this.h, this.set.initLevel, this.depth, [], 30)
  }

}


class Tile {
  constructor(x, y, w, h, c, r) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
    this.r = r
    this.bg = color(0,0,0,1)
    this.fg = color(255,255,255,1)
    this.n = 0
    this.amp = grid.set.amp
    this.color = false
    this.sin = 0
    this.cos = 0
    this.a = random(TAU)
    this.center = createVector(this.x + this.w/2, this.y + this.h/2, 0)
    this.short = min(this.w, this.h)
    this.long = max(this.w, this.h)
    this.i = this.c * grid.set.c + this.r
  }

  update(f, speed) {
    this.n = noise((this.c + 1) * grid.set.amp, (this.r + 1) * grid.set.amp, f * speed)
    this.sin = sin(this.a)
    this.cos = cos(this.a)
    this.a += .05
  }

  draw() {
    stroke(255, 0, 0)
    noStroke()
    if (grid.set.fill) {
        if (grid.type == 'noise') {
          this.bg = this.n * 255
        }
        if (grid.type == 'random') {
          this.bg = random(255)
        }
        if (grid.type == 'check') {
          if (this.i % 2 == 0) {
            this.bg = 255
          }
        }
    } else {
      this.bg = 0
    }
    this.fg = 255 - this.bg

    if (grid.shape == 'rect') {
      fill(this.bg)
      rect(this.x, this.y, this.w, this.h)
    }
    if (grid.shape == 'ellipse') {
      fill(this.bg)
      rect(this.x, this.y, this.w, this.h)
      fill(this.fg)
      ellipse(this.x, this.y, this.w, this.h, 50)
    }
    if (grid.shape == 'circle') {
      fill(this.bg)
      rect(this.x, this.y, this.w, this.h)
      fill(this.fg)
      ellipse(this.x, this.y, this.short, this.short)
    }
    if (grid.shape == 'switch') {
      let posX = map(this.sin, -1, 1, this.x, this.x + this.w - this.short)
      let posY = map(this.cos, -1, 1, this.y, this.y + this.h - this.short)
      if (grid.set.three) {
        push()
        translate(posX+this.short/2,posY+this.short/2,0)
        sphere(this.short/2)
        pop()
      } else {
        fill(this.bg)
        rect(this.x, this.y, this.w, this.h)
        fill(this.fg)
        ellipse(posX, posY, this.short, this.short, 50)
      }
    }
  }
}
