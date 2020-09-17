let value; // Permite escoger que filtro se va a realizar
let matrixsize; // Tamaño de la matriz
var matrix; // Matriz de convoluciones     

let canvas_01;
let canvas_02;

//dim lienzo
var widthI = 500;   
var heightI = 500;  

function preload() {
    video1 = createVideo("tiger.mp4");
    video2 = createVideo("tiger.mp4");
    video1.hide()
    video2.hide()
}

function setup() {
    var canvas = createCanvas(widthI*2+20, heightI);
    canvas.parent('simple-sketch-holder');

    canvas_01 = createGraphics(widthI, heightI);
    canvas_02 = createGraphics(widthI, heightI);
}

function draw(){
 
    canvas_01.image(video1, 0, 0);
    canvas_02.image(video2, 0, 0);
    
    image(canvas_01, 0, 0);
    image(canvas_02, widthI+10, 0);
}

function mousePressed() {
    video1.loop(); 
    video2.loop()
  }

function keyPressed(){
    matrixsize = 3;

    switch(key) {
            
        case '1':   // Enfocar. Acentúa los bordes
            value = 11;
            matrix = [ [ -1, -1, -1 ],
                       [ -1,  9, -1 ],
                       [ -1, -1, -1 ] ]; 
            break;
        case '2':   // Repujado
            matrix = [ [ -2, -1,  0 ],
                       [ -1,  1,  1 ],
                       [  0,  1,  2 ] ]; 
            value = 12;
            break;
        case '3':   // Detección de bordes
            matrix = [ [  1,  0, -1 ],
                       [  0,  0,  0 ],
                       [ -1,  0,  1 ] ]; 
            value = 13;
            break;
        case '4':
            matrix = [ [  0,  1,  0 ],
                       [  1, -4,  1 ],
                       [  0,  1,  0 ] ]; 
            value = 14;
            break;
        case '5':
            matrix = [ [ -1, -1, -1 ],
                       [ -1,  8, -1 ],
                       [ -1, -1, -1 ] ];
            value = 15;
            break;
        case '6':   // Enfocar
            matrix = [ [  0, -1,  0 ],
                       [ -1,  5, -1 ],
                       [  0, -1,  0 ] ];
            value = 16;
            break;
        case '7':   // Desenfoque de cuadro (normalizado)
            matrix = [ [ 1/9, 1/9, 1/9 ],
                       [ 1/9, 1/9, 1/9 ],
                       [ 1/9, 1/9, 1/9 ] ]; 
            value = 17;
            break;
       
        default:
            break;
    }
}

