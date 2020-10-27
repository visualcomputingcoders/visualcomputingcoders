final int NUMBER_OF_ELLIPSES_PER_FLOWER = 8;
final int FLOWER_RADIUS = 60;

final float TOTAL_ANGLE = 2 * PI;
final float ANGLE_BETWEEN_ELLIPSES = TOTAL_ANGLE / NUMBER_OF_ELLIPSES_PER_FLOWER;

final float MAYOR_AXIS_SIZE = 46 * FLOWER_RADIUS / 150;
final float MINOR_AXIS_SIZE = MAYOR_AXIS_SIZE / 1.6;

final float BORDER_PERCENTAGE = 0.10;
final float BORDER_MAYOR_SIZE = MAYOR_AXIS_SIZE * ( 1 + BORDER_PERCENTAGE );
final float BORDER_MINOR_SIZE = MINOR_AXIS_SIZE + (BORDER_MAYOR_SIZE - MAYOR_AXIS_SIZE);


void setup() {
  frameRate(10);
  size(900, 700);
  background(0,0,200);
} 

void drawFlower(int x, int y, boolean firstColor) {
  pushMatrix();
  translate(x, y);  
  for (int i = 0 ; i < NUMBER_OF_ELLIPSES_PER_FLOWER ; i++) {
    rotate(ANGLE_BETWEEN_ELLIPSES);
    
    ellipseMode(RADIUS);  
    noStroke();
    
    fill(255, 255, 255);
    arc(FLOWER_RADIUS, 0, BORDER_MAYOR_SIZE, BORDER_MINOR_SIZE, 0, PI); 

    fill(0, 0, 0);
    arc(FLOWER_RADIUS, 0, BORDER_MAYOR_SIZE, BORDER_MINOR_SIZE, PI, 2*PI); 

    if (firstColor) {
      fill(232, 98, 11);
    } else {
      fill(231, 176, 89);
    }

    ellipse(FLOWER_RADIUS, 0, MAYOR_AXIS_SIZE, MINOR_AXIS_SIZE);
  }
  popMatrix();
}

void draw() {
  for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 4; j++) {
      drawFlower(j * FLOWER_RADIUS * 3, i * FLOWER_RADIUS * 3, (i + j) % 2 == 0);
    }
  }
}