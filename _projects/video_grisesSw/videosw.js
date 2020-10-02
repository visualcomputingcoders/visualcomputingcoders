let value; // Permite escoger que filtro se va a realizar
let matrixsize; // Tamaño de la matriz
var matrix; // Matriz de convoluciones     

let canvas_01;
let canvas_02;

let fr = 30; //starting FPS
var widthI = 500;   // Anchura del lienzo
var heightI = 500;  // Altura del lienzo

function preload() {
    img_01 = createCapture(VIDEO);
    img_02 = createCapture(VIDEO);
    img_01.hide();
    img_02.hide();
}

function setup() {
    var canvas = createCanvas(widthI*2+20, heightI);
    canvas.parent('simple-sketch-holder');

    canvas_01 = createGraphics(widthI, heightI);
    canvas_02 = createGraphics(widthI, heightI);
    textSize(20); 
    
     frameRate(fr); 
}

function draw(){
    drawCanvas_01();
    drawCanvas_02();
    
    selectValue();

    image(canvas_01, 0, 0);
    image(canvas_02, widthI+10, 0);
    text("Frame Count with frameRate " +  
         float(getFrameRate()).toFixed( 2 ), 20, 20); 
    fill(255);
}

function keyPressed(){
    matrixsize = 3;

    switch(key) {
        case '1':
            value = 1;
            break;
        case '2':
            value = 2;
            break;

        case '3':   
            value = 11;
            matrix = [ [ -1, -1, -1 ],
                       [ -1,  9, -1 ],
                       [ -1, -1, -1 ] ]; 
            break;
        case '4':   // Repujado
            matrix = [ [ -2, -1,  0 ],
                       [ -1,  1,  1 ],
                       [  0,  1,  2 ] ]; 
            value = 12;
            break;
        case '5':   // Detección de bordes
            matrix = [ [  1,  0, -1 ],
                       [  0,  0,  0 ],
                       [ -1,  0,  1 ] ]; 
            value = 13;
            break;
              
        default:
            break;
    }
}


// Funciones Disenadas
const drawCanvas_01 = ()=>{ // Pone el primer video en el lienzo 1
    canvas_01.image(img_01, 0, 0);
}

const drawCanvas_02 = ()=>{ // Pone el segundo video en el lienzo 2
    canvas_02.image(img_02, 0, 0);
}

const selectValue = ()=>{ // Selecciona el filtro a utilizar dependiendo del valor que tenga value
    if ( 0 < value && value <10 ) {
        filtrosBlancoNegro(value);
    }else if(value > 10) {
        convolutions();
    }
}

const filtrosBlancoNegro = (gray)=>{ // Escala de grises
    let lightness = 210;
    img_02.loadPixels();

	for (let y = 0; y < img_02.height; y++) {
		for (let x = 0; x < img_02.width; x++){ 
            let index = (x+y*img_02.width)*4; // Posicion del pixel
            
            let r=img_02.pixels[index+0]; // Componente Red
            let g=img_02.pixels[index+1]; // Componente Green
            let b=img_02.pixels[index+2]; // Componente Blue
            let a=img_02.pixels[index+3]; // Componente Alpha
			
			if (gray===1){
				let I=(r+g+b)/3; // Promedio de los tres componentes
				lightness = I;
					
			} else if (gray===2){ // Promedio ponderado de RGB con corrección gamma (Luma)
				let Y601= 0.2989*r + 0.5870*g + 0.1140*b; // SDTV
				lightness = Y601;
			} 

			img_02.pixels[index+0]=lightness;
			img_02.pixels[index+1]=lightness;
			img_02.pixels[index+2]=lightness;
			img_02.pixels[index+3]=a;
			
			if (gray===0){ // Imagen original
				pixels[index+0]=r;
				pixels[index+1]=g;
				pixels[index+2]=b;
				pixels[index+3]=a;
			}
		}
	}
	img_02.updatePixels();
}


const convolutions = ()=>{ // Mascara de convoluciones
    img_02.loadPixels();

	for (let x = 0; x < img_02.width; x++) {
		for (let y = 0; y < img_02.height; y++ ) { 
			let c = convolutionAux(x, y, matrix, matrixsize, img_02);
			let loc = (x + y*img_02.width)*4;

			img_02.pixels[loc] = red(c);
			img_02.pixels[loc+1] = green(c);
			img_02.pixels[loc+2] = blue(c);
			img_02.pixels[loc+3] = alpha(c);
		}
    }    
    img_02.updatePixels();
}

const convolutionAux = (x, y, matrix, matrixsize, img)=>{
	var rtotal = 0;
	var gtotal = 0
	var btotal = 0;
	var atotal = 0;

	for (let i = 0; i < matrixsize; i++){
		for (let j= 0; j < matrixsize; j++){
			var xloc = x+i;
			var yloc = y+j;
			var loc = (xloc + img.width*yloc)*4;

			loc = constrain(loc,0,img.pixels.length-1);
			rtotal += ((img.pixels[loc+0]) * matrix[i][j]);
			gtotal += ((img.pixels[loc+1]) * matrix[i][j]);
			btotal += ((img.pixels[loc+2]) * matrix[i][j]);
			atotal += ((img.pixels[loc+3]) * matrix[i][j]);
		}
	}
	// Restringir el rango de los valores RGBA
	rtotal = constrain(rtotal, 0, 255);
	gtotal = constrain(gtotal, 0, 255);
	btotal = constrain(btotal, 0, 255);
	atotal = constrain(atotal, 0, 255);
	// Retorna el color resultante
	return color(rtotal, gtotal, btotal);
}