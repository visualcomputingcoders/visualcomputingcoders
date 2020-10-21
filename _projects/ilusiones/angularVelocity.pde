final int CIRCLE_SIZE = 300;
final int degreesPerClick = 10;
final float deltaVelocity = degreesPerClick * PI / 180.0;

void setup(){
  frameRate(50);
  size(600, 600);
}

float velocity = deltaVelocity;
float theAngle = 0;

void drawCircle(float angle){
   pushMatrix();
     rotate(angle);
     ellipseMode(CENTER);
     noStroke();
     fill(255, 0, 0);
     arc(0, 0, CIRCLE_SIZE, CIRCLE_SIZE, 0, 2.0 * PI / 3.0);
     
     fill(0, 255, 0);
     arc(0, 0, CIRCLE_SIZE, CIRCLE_SIZE, 2.0 * PI / 3.0, 4.0 * PI / 3.0);
     
     fill(0, 0, 255);
     arc(0, 0, CIRCLE_SIZE, CIRCLE_SIZE, 4.0 * PI / 3.0, 2 * PI);
   popMatrix();
}

int toDegrees(float radians){
  return Math.round(radians * 180 / PI);
}

void drawText() {
   textAlign(CENTER);
   textSize(20);   
   text("Angular velocity: " + toDegrees(velocity) + "°", width/2, 0); 
   
}

void increaseAngle() {
    theAngle += velocity;
}

void draw(){
   background(168, 168, 168);
   translate(190, 300);
   drawCircle(theAngle);
   drawText();
   increaseAngle();
}

void mousePressed(){
   velocity += deltaVelocity; 
}