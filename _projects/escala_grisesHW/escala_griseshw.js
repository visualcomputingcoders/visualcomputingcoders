let theShader;
let shaderTexture;
let img;
let cam;

let theShaderVideo;
let shaderVideo;
let video;

let angle=0;
let gray = 0;

function preload(){
  img = loadImage('luffy.png');
  video = createVideo('');
  video.hide();
  // Cargar los shaders
  theShader = loadShader('texture.vert','texture.frag');
  theShaderVideo = loadShader('texture.vert','texture.frag');
  
}

function setup() {
  pixelDensity(1);
   
  // Se requiere trabajar con WEBGL
  canvas = createCanvas(1100, 400, WEBGL);
  canvas.parent('simple-sketch-holder');
  noStroke();


  shaderTexture = createGraphics(512, 512, WEBGL);
  shaderVideo = createGraphics(windowWidth, windowHeight, WEBGL);
  
  // Quitar bordes en el createGraphics
  shaderTexture.noStroke();
  shaderVideo.noStroke();  
  
  //cam.hide();
  video.loop();
}

function draw() {
  // Se pasa el shader a la capa del createGraphics
  shaderTexture.shader(theShader);
  

  // Valores uniform para el fragment shader
  theShader.setUniform("u_img", img);
  theShader.setUniform("u_key", gray);

  
  // Renderizar el shader
  shaderTexture.rect(0,0,width,height);

  pointLight(255, 255, 255, 0, 0, 500);
	// Efecto linterna
	let dx= mouseX-width/2;
	let dy= mouseY-height/2;
	pointLight(100,250,255,dx,dy,100);
 
  background(0);

  push();
  //Se pasa el shader como textura
  texture(shaderTexture);
  translate(200, 0, 0);
  rotateZ(angle);
  rotateX(angle);
  rotateY(angle*2); 
  box(200);
  pop();
  
  // Rotacion de la caja
  angle += 0.002;
    
  // Se pasa la imagen original como textura
  texture(img);  
  ellipse(-250, 0, 350, 350, 100);  
  push();


}

// Se ejecuta cuando se presiona cualquier tecla
function keyPressed() {
	if (key === '0') {
	gray = 0;
	} else if (key === '1') { 
	gray = 1;
	} else if (key === '2') {
	gray = 2;
	} 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}