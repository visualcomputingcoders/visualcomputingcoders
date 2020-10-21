let lienzo_01;
var maxRange = 256
var histogram = new Array(maxRange);

var lienzo01;
var lienzo02;

var heightI = 600;
var widthI = 450;

let redC=0;
let greenC=0;
let blueC=0;

function preload() {
    img_01 = loadImage("luffy.png");
    img_02 = loadImage("luffy.png");
}


function setup() { 
  var canvas = createCanvas(1000, 400);
  canvas.parent('simple-sketch-holder');
  background(255);

  lienzo01 = createGraphics(widthI,heightI);
  lienzo02 = createGraphics(widthI,heightI);  
  drawLienzo01();
  image(lienzo01,0,0);
  image(lienzo02, widthI+5, 0);

}

function drawLienzo01(){
    lienzo01.image(img_02, 0, 0);
    lienzo01.noStroke();
}



function draw() {
    histograma()   
}



/*
function calculoHist(img) {
  let hist = [];
  for (let i = 0; i < 256; i++) {
    hist[i] = 0;
  }


  // Calculate the histogram
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let bright = int(brightness(img.get(i, j)));
      hist[bright] = hist[bright] + 1;
    }
  }

  return hist;
}

function histograma() {

  let img = lienzo01.get();

  let hist = calculoHist(img);

  let histMax = max(hist);

  stroke(255);
  // Draw half of the histogram (skip every second value)
  for (let i = 0; i < img.width; i += 2) {
    // Map i (from 0..img.width) to a location in the histogram (0..255)
    let which = int(map(i, 0, img.width, 0, 255));
    // Convert the histogram value to a location between
    // the bottom and the top of the picture
    let y = int(map(hist[which], 0, histMax, img.height, 0));
    line(i, img.height, i, y);
  }
}

*/