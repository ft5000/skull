var w = 700,
    h = 700,
    ps = 10

var cw = true;
var mode = true;
var fgc;
var bgc;

let img;

function preload() {
    img = loadImage('img/spin_3.gif');
}

function setup() {
    createCanvas(w, h);
    textFont('Consolas');
    textSize(ps*2);
    noStroke();
    img.delay(40);
    fgc = color(255, 255, 255);
    bgc = color(0, 0, 0);
}

document.body.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
        if (!cw) {
            var i = getReverseIndex(img.gifProperties)
            reverse(img.gifProperties.frames)
            img.gifProperties.displayIndex = i;
            cw = !cw;
        }
    }
    
    if (e.key == 'ArrowRight') {
        if (cw) {
            var i = getReverseIndex(img.gifProperties)
            reverse(img.gifProperties.frames)
            img.gifProperties.displayIndex = i;
            cw = !cw;
        }   
    }

    if (e.key == 'ArrowUp') { 
        mode = !mode;
    }
})

function draw() {
    image(img, 0, 0)
    img.loadPixels();
    background(bgc);

    if (mode) {
        for (var x = 0; x < w; x += ps) {
            for (var y = 0; y < h; y += ps*4) {
                var b = pixelBrightness(x, y);
                var c = b >= 100 ? fgc : bgc;
                var px = b >= 150 ? ps : ps/2;
                fill(c);
                rect(x, y, px, ps*2);
            }
        }

        for (var x = ps/2; x < w; x += ps) {
            for (var y = ps*2; y < h; y += ps*4) {
                var b = pixelBrightness(x, y);
                var c = b >= 100 ? fgc : bgc;
                var px = b >= 150 ? ps : ps/2;
                fill(c);
                rect(x, y, px, ps*2);
            }
        }
    }

    if (!mode) {
        for (var x = 0; x < w; x += ps*1.5) {
            for (var y = 0; y < h; y += ps*1.5) {
                var b = pixelBrightness(x, y);
                var c = b >= 100 ? fgc : bgc;
                var ch = getCharacter(b);
                fill(c);
                text(ch, x, y + ps)
            }
        }
    }

    
    if (frameCount % 130 == 0) {
        mode = !mode;
    }
}

function getCharacter(b) {
    if (b >= 190) {
        return "#";
    }
    else if (b >= 150 && b < 190) {
        return "/";
    }
    else if (b >= 120 && b < 150) {
        return ";";
    }
    else if (b < 120) {
        return ".";
    }

    return "";
}

function getReverseIndex(gif) {
    var n = gif.numFrames,
        i = gif.displayIndex
    return n - i;
}

function pixelBrightness(x, y) {
    var c = img.get(x, y);
    var b = (c[0] + c[1] + c[2]) / 3;
    return b;
}