/**
 * @class Draw a Sierpinski Triangle with p5.js.
 * @author {@link https://github.com/vitorgt Vitor Gratiere Torres}
 * @license CC0-1.0
 */
class SierpinskiTriangle {

    /**
     * @constructor Creates an instance of a Sierpinski Triangle.
     */
    constructor() {
        this.divName = 'sketch_st';
        this.iteration = 0;
        // var w = document.querySelector(this.divName).clientWidth
        // var h = select(this.divName).style.height;
        this.size = Math.min(windowWidth, windowHeight);
        this.tap = "Tap to draw";
        this.levels = "Drawn levels: ";
        this.total = "Total triangles drawn: ";
        // this.bg = createColorPicker('#FFFFFF');
        // this.bg.position(5, 50);
        this.bg = 255;
        // this.fg = createColorPicker('#000000');
        // this.fg.position(5, 70);
        this.fg = 0;
        this.canv = createCanvas(this.size, this.size);
        this.canv.parent(this.divName);
        noStroke();
        background(this.bg);
        text(this.tap + "\n" +
             this.levels + this.iteration + "\n" +
             this.total + 0,
             5, 15);
    }

    /**
     * From a box at (x, y) with width of size, it draws a white inner triangle.
     * @param {number} x X origin of the box.
     * @param {number} y Y origin of the box.
     * @param {number} size Width of the box.
     * @param {number} lvl Which level it will draw.
     */
    triangleBox(x, y, size, lvl) {
        if (lvl < this.iteration) {
            triangle(x + size / 4, y + size / 2,
                     x + (3 * size) / 4, y + size / 2,
                     x + size / 2, y + size);
            this.triangleBox(x + size / 4, y, size / 2, lvl + 1);
            this.triangleBox(x, y + size / 2, size / 2, lvl + 1);
            this.triangleBox(x + size / 2, y + size / 2, size / 2, lvl + 1);
        }
    }

    /**
     * Does an iteration drawing the next level.
     */
    iterate() {
        background(this.bg);
        fill(this.fg);
        triangle(this.size / 2, 0,
                 0, this.size,
                 this.size, this.size);
        text(this.tap + "\n" +
             this.levels + this.iteration + "\n" +
             this.total + Math.pow(3, this.iteration),
             5, 15);
        fill(this.bg);
        this.triangleBox(0, 0, this.size, 0);
        this.iteration++;
    }

    /**
     * @return {number} The number of drawn levels so far.
     */
    getLevels() {
        return this.iteration - 1;
    }

}

function setup() {
    st = new SierpinskiTriangle();
}

function mousePressed() {
    st.iterate();
}

function keyTyped() {
    if (key === 's') {
        save("sierpinskiTriangle" + st.getLevels() + ".png");
    }
}
