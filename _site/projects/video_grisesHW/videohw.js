let theShader;
let shaderTexture;
let img;
let fr = 30; //starting FPS

let theShaderVideo;
let shaderVideo;
let video;

let angle=0;
let mask = 0;

function preload(){
img = createCapture(VIDEO);
  video = createCapture(VIDEO);
  video.hide();
  // Cargar los shaders
  theShader = loadShader('texture.vert','texture.frag');
  theShaderVideo = loadShader('texture.vert','texture.frag');  
}

function setup() {
  pixelDensity(1);
  //cam = createCapture(VIDEO); //crea una captura de video
  //cam.size(windowWidth, windowHeight); //definde el tamaño de la captura
  textSize(20); 
    
  frameRate(fr); 
  
  // uso de webGL
  var canvas = createCanvas(1000, 400, WEBGL);
  canvas.parent('simple-sketch-holder');

  noStroke();
  // inicializar la capa del createGraphics crea y retorna un nuevo objeto p5.Renderer.
  shaderTexture = createGraphics(512, 512, WEBGL);
  shaderVideo = createGraphics(windowWidth, windowHeight, WEBGL);
  
  video.loop();
}

function draw() {
  // pasamos el shader al lienzo createGraphics  
  shaderTexture.shader(theShader);
  shaderVideo.shader(theShaderVideo);

  //  enviar nuestros valores uniformes al shader
  theShader.setUniform("u_img", img);
  theShader.setUniform("u_key", mask);
  theShader.setUniform("stepSize", [1.0/width,1.0/height]);
  theShaderVideo.setUniform('u_img', video);
  theShaderVideo.setUniform('u_key', mask);
  theShaderVideo.setUniform("stepSize", [1.0/width,1.0/height]);
  
  // Renderizar el shader
  shaderTexture.rect(0,0,width,height);
  shaderVideo.rect(0,0,width,height);
 

  background(255);
 

  push();
  // Se pasa el shader como textura
  texture(shaderTexture);
  translate(200, 0, 0);
  rotateZ(angle);
  rotateX(angle);
  rotateY(angle*2); 
  box(200);
  pop();
  
  // Rotacion de la caja
  angle += 0.002;
  
  push();
  // Se pasa la imagen original como textura
  texture(img);

  pop();
  
  push();
  //Se pasa el shader del video como textura
  texture(shaderVideo);
  translate(0, 0, -100);
  plane(900,500);
  pop();  
 

  
}

// Se ejecuta cuando se presiona cualquier tecla
function keyPressed() {
	if (key === '0') {
	mask = 0;
	} else if (key === '1') { 
	mask = 1;
	} else if (key === '2') {
	mask = 2;
	} else if (key === '3') {
	mask = 3;
	} else if (key === '4') {
	mask = 4;
	} 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}