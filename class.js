class Tile {
    constructor(col, row, posX, posY, tW, tH, color) {
        this.col = col
        this.row = row
        this.x = posX
        this.y = posY
        this.w = tW
        this.h = tH
        this.col = color
    }

    update(x, y, w, h, c) {
        this.x = x
        this.w = w
        this.col = c * 255
    }

    draw() {
        stroke(0, 255, 0)

        noStroke()
        // fill(255 - this.col)
        // rect(this.x,this.y,this.w,this.h)
        fill(this.col)
        ellipse(this.x,this.y,this.w,this.h)
    }
}
