let img; // Declarar variable 'img'
let lightness = 0; // Variable de ligereza
let gray=0;

function setup() { 
  var canvas = createCanvas(400, 330);
  canvas.parent('simple-sketch-holder');
  background(210);
  pixelDensity();
  img = loadImage('luffy.png');
  var title = 'ORIGINAL';
  textSize(18);
  stroke(128,255,255);
 
  textAlign(CENTER);
} 

function draw() {

	loadPixels();
    img.loadPixels();
   
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++){ 
			let index = (x+y*width)*4; // Posicion del pixel
            let r=img.pixels[index+0]; // Componente Red
            let g=img.pixels[index+1]; // Componente Green
            let b=img.pixels[index+2]; // Componente Blue
            let a=img.pixels[index+3]; // Componente Alpha
			
			if (gray===1){
				let I=(r+g+b)/3; // Promedio de los tres componentes
				lightness = I;
				title = 'RGB';
			} else if (gray===2){ // Promedio ponderado de RGB con corrección gamma (Luma)
				let Y601= 0.2989*r + 0.5870*g + 0.1140*b; // SDTV
				lightness = Y601;
				title = 'LUMA ';
			} 
						            
			pixels[index+0] = lightness;
			pixels[index+1] = lightness;
			pixels[index+2] = lightness;
			pixels[index+3] = a;
			
			if (gray===0){ // Imagen original
				pixels[index+0] = r;
				pixels[index+1] = g;
				pixels[index+2] = b;
				pixels[index+3] = a;
				title = 'IMAGEN ORIGINAL';
			}
		}
	}
	updatePixels();
	image(img, 12, 12, img.width *0.26, img.height *0.26);
	text(title, width/2, 20);
}

// Se ejecuta cuando se presiona cualquier tecla
function keyPressed() {
	if (key === '1') {
    gray = 1;
  } else if (key === '2') { 
    gray = 2;
  }  else if (key === '3') { 
    gray = 0;
  }  

}