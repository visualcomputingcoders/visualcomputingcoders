var rotation = 0;
var x,y,z,size;

function setup() {
  var canvas = createCanvas(700, 700, WEBGL);
  canvas.parent('simple-sketch-holder');
  
  
  //camera(100, 100, 100, 25, 25, 25, 0, 0, 0);
  sSlider = createSlider(1, 6, 4);
  sSlider.position(20, 700);
  
  xSlider = createSlider(1, 100, 25);
  xSlider.position(20, 750);
  
  ySlider = createSlider(1, 100, 25);
  ySlider.position(200, 750);
  
  zSlider = createSlider(1, 100, 10);
  zSlider.position(375, 750);
  
}

function draw() {
  size=sSlider.value();
  let t = -size * 25;
  background(250);
  orbitControl();
  translate(t, 0, 0);
  normalMaterial();
  rotation = PI / 180 * 45;
  drawBox(rotation); 
  
  let xa=xSlider.value(),ya=ySlider.value(), za=zSlider.value();
  
  x=xa;  y=ya;  z=za;
  drawBoxLines(x,y,z,size);  
    
  x=xa;  y=-ya;  z=-za;
  drawBoxLines(x,y,z,size);
  
  x=-xa;  y=-ya;  z=za;
  drawBoxLines(x,y,z,size);
  
  x=-xa;  y=ya;  z=-za;
  drawBoxLines(x,y,z,size);
  
}

function drawBoxLines(x,y,z,size){
  for (let i = 1; i < size; i++) {
    translate(x, y, z);
    drawBox(rotation);
  }
}

function drawBox(rotation){
  push();
  rotate(rotation);
  box(50, 50, 50);
  pop();
}
