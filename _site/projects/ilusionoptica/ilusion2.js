function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('simple-sketch-holder');
  angleMode(DEGREES);
}

function draw() {
  background('darkblue');
  noStroke();
  fill('yellowgreen');
  // Move the origin to the center
  translate(width / 2, height / 2);
  
  // Don’t look at this line
  rotate(frameCount / 50);
  
  for (let i = 0; i < 8; ++i) {
    push();
    rotate(360 / 8 * i);
    translate(width / 4, 0);
    ellipse(0, 0, 50, 50);
    pop();
  }  
}