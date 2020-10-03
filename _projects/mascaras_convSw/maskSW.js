var w = 60;
var K= 2;

var lienzo_01;
var lienzo_02;
var img_01;
var img_02;


let matrixsize = 3;
var matrix = [ [  0,  0,  0 ],
               [  0,  1,  0 ],
               [  0,  0,  0 ] ];
var title = 'Original';


function setup() { 
	var canvas =  createCanvas(850, 330);
	canvas.parent('simple-sketch-holder');
	background(230,230,230);
	pixelDensity();

	img_01 = loadImage('luffy.png');
	img_02 = loadImage('luffy.png');

	lienzo_01 = createGraphics(400, 330);
	lienzo_02 = createGraphics(400, 330);

	lienzo_01.textSize(18);
	lienzo_01.stroke(255,255,128);
	lienzo_01.textAlign(CENTER);
} 

function draw() {
    drawImage_01();
    drawImage_02();

	
}
// Dibuja la imagen de la Izquierda
function drawImage_01() {
	lienzo_02.image(img_01, 0, 0); 
	lienzo_01.text(title, 0, 20,lienzo_01.width); 
}
// Dibuja la imagen de la Derecha
function drawImage_02() {
	// We're only going to process a portion of the image
	// so let's set the whole image as the background first
	image(img_02, 0, 0);



	loadPixels();
	img_02.loadPixels();
	let img = createImage(400, 330);
	img.loadPixels();

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++ ) { 
			let c = convolution(x, y, matrix, matrixsize, img_02);
			let loc = (x + y*img_02.width)*4;

			img.pixels[loc] = red(c);
			img.pixels[loc+1] = green(c);
			img.pixels[loc+2] = blue(c);
			img.pixels[loc+3] = alpha(c);
		}
	}
	
	img.updatePixels();
	image(img, 450, 0); 
}

function convolution(x, y, matrix, matrixsize, img){
	//img.loadPixels();
	var rtotal = 0;
	var gtotal = 0;
	var btotal = 0;
	var atotal = 0;
	var offset = matrixsize / 2;
	for (let i = 0; i < matrixsize; i++){
		for (let j= 0; j < matrixsize; j++){
			// What pixel are we testing
			var xloc = x+i;
			var yloc = y+j;
			var loc = (xloc + img.width*yloc)*4;

			// Make sure we haven't walked off our image, we could do better here
			loc = constrain(loc,0,img.pixels.length-1);
			// Calculate the convolution
			rtotal += ((img.pixels[loc]) * matrix[i][j]);
			gtotal += ((img.pixels[loc+1]) * matrix[i][j]);
			btotal += ((img.pixels[loc+2]) * matrix[i][j]);
			atotal += ((img.pixels[loc+3]) * matrix[i][j]);
		}
	}

	// Make sure RGB is within range
	rtotal = constrain(rtotal, 0, 255);
	gtotal = constrain(gtotal, 0, 255);
	btotal = constrain(btotal, 0, 255);
	atotal = constrain(atotal, 0, 255);
	// Return the resulting color
	return color(rtotal, gtotal, btotal);
}
// Se ejecuta cuando se presiona cualquier tecla
function keyPressed() {
	matrixsize = 3;
	if (key === '0') { // Identidad
    matrix = [ [  0,  0,  0 ],
               [  0,  1,  0 ],
			   [  0,  0,  0 ] ]; 
			   title = 'Original';
  } else if (key === '1') { // Enfocar. Acentúa los bordes
    matrix = [ [ -1, -1, -1 ],
               [ -1,  9, -1 ],
			   [ -1, -1, -1 ] ]; 
			   title = 'ACENTUAR BORDES';
  } else if (key === '2') { // Repujado
    matrix = [ [ -2, -1,  0 ],
               [ -1,  1,  1 ],
			   [  0,  1,  2 ] ]; 
			   title = 'REPUJADO';
  }  else if (key === '3') {
    matrix = [ [  0,  1,  0 ],
               [  1, -4,  1 ],
			   [  0,  1,  0 ] ]; 
			   title = 'DETECCIÓN DE BORDES';
  } else if (key === '4') {
    matrix = [ [ -1, -1, -1 ],
               [ -1,  8, -1 ],
			   [ -1, -1, -1 ] ]; 
			   title = 'DETECCIÓN DE BORDES';
  } else if (key === '5') { // Enfocar
    matrix = [ [  0, -1,  0 ],
               [ -1,  5, -1 ],
			   [  0, -1,  0 ] ];
			   title = 'ENFOCAR';
  } else if (key === '6') { 
    matrix = [ [ 1/9, 1/9, 1/9 ],
               [ 1/9, 1/9, 1/9 ],
			   [ 1/9, 1/9, 1/9 ] ]; 
			   title = 'DESENFOQUE';
  } 
}