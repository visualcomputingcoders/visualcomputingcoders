
var pg;

var photo;

var photoTransform;

var histogram;

var f;

function setup() {
    initializeFields();
    var canvas = createCanvas(400, 400);
     canvas.parent('simple-sketch-holder');

    pg = createGraphics(295, 295);
    photo = loadImage("luffy.png");
    photoTransform = loadImage("luffy.png");
    histogram = createImage(300, 300, RGB);
}

function draw() {
    background(0, 0, 0);
 
  
    // renderizamos imagen original
    pg.beginDraw();
    pg.image(photo, 0, 0);
    pg.endDraw();
    image(pg, 10, 10);
    // transformacion a escala de grises
    var pixelLoc;
    var colorGray;
    pg.beginDraw();
    for (var y = 0; y < photo.height; y++) {
        for (var x = 0; x < photo.width; x++) {
            pixelLoc = x + y * photo.width;
            var dataColor = red(photo.pixels[pixelLoc]) * 0.2126 + green(photo.pixels[pixelLoc]) * 0.7152 + blue(photo.pixels[pixelLoc]) * 0.0722;
            colorGray = color(dataColor, dataColor, dataColor);
            photoTransform.pixels[pixelLoc] = colorGray;
        }
    }
    photoTransform.updatePixels();
    pg.image(photoTransform, 0, 0);
    pg.endDraw();
    image(pg, 335, 10);
    // calculo histograma
    var hist = new Array(256);
    // Calculamos el histograma
    for (var i = 0; i < photo.width; i++) for (var j = 0; j < photo.height; j++) {
        // almacenamos el brillo de cada uno de los pixeles
        var bright = int(brightness(photoTransform.get(i, j)));
        // sumamos una unidad al valor que se tiene en la posicion del brillo
        hist[bright]++;
    }
    pg.beginDraw();
    // ponemos el fondo de la imagen blanco
    for (var i = 0; i < histogram.pixels.length; i++) {
        histogram.pixels[i] = color(255, 255, 255);
    }
    histogram.updatePixels();
    pg.image(histogram, 0, 0);
    for (var i = 0; i < histogram.width; i++) {
        var x = int(map(i, 0, histogram.width, 0, 255));
        var y = int(map(hist[x], 0, max(hist), histogram.height, 0));
        pg.stroke(0);
        pg.line(i, y, i, histogram.height);
    }
    pg.endDraw();
    image(pg, 660, 10);
}

function keyPressed() {
    if (__keyIsCoded()) {
        if (keyCode == UP_ARROW) {
            photo = loadImage("luffy.png");
            photoTransform = loadImage("luffy.png");
        }
        if (keyCode == DOWN_ARROW) {
            photo = loadImage("prueba.jpg");
            photoTransform = loadImage("prueba.jpg");
        }
        if (keyCode == LEFT_ARROW) {
            photo = loadImage("prueba3.jpg");
            photoTransform = loadImage("prueba3.jpg");
        }
    }
}

function initializeFields() {
    pg = null;
    photo = null;
    photoTransform = null;
    histogram = null;
  
}

function __keyIsCoded() {
    return keyCode == BACKSPACE || keyCode == DELETE || keyCode == ENTER || keyCode == RETURN || keyCode == TAB || keyCode == ESCAPE || keyCode == SHIFT || keyCode == CONTROL || keyCode == OPTION || keyCode == ALT || keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW;
}

function preload() {
// TODO: put method calls that load from files into this method
// I found the following calls that you should move here:
// - on line 12: photo = loadImage("luffy.png")
// - on line 13: photoTransform = loadImage("luffy.png")
// - on line 97: photo = loadImage("luffy.png")
// - on line 98: photoTransform = loadImage("luffy.png")
// - on line 101: photo = loadImage("prueba.jpg")
// - on line 102: photoTransform = loadImage("prueba.jpg")
// - on line 105: photo = loadImage("prueba3.jpg")
// - on line 106: photoTransform = loadImage("prueba3.jpg")
// (note that line numbers are from your Processing code)
}

