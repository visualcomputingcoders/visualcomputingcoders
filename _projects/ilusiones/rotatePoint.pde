int doNotPaint = 0;

void setup() {
    frameRate(6);
    size(400, 400);
    background(169,169,169);
} 

void printCross(){
    int centerX = 400 / 2;
    int centerY = 400 / 2;
   
    strokeWeight(4);
    line(centerX - 10, centerY, centerX + 10, centerY);
    line(centerX, centerY - 10, centerX, centerY + 10);
}

int getX(float angle){
    return (int)( cos(angle) * 170 ) + 200;
}

int getY(float angle){
    return (int)( sin(angle) * 170 ) + 200;
}

void draw() {
    printCross();
    
    for(int i = 0 ; i < 360 ; i+=30){
        if(i != doNotPaint){
            ellipseMode(RADIUS);  
            fill(255, 0, 90);
            noStroke();
            float angle = (i * PI) / 180.0;
            ellipse(getX(angle), getY(angle), 12, 12); 
        }else{
            ellipseMode(RADIUS);  
            fill(169,169,169);
            noStroke();
            float angle = (i * PI) / 180.0;
            ellipse(getX(angle), getY(angle), 13, 13); 
        }
    }
    doNotPaint = (doNotPaint + 30) % 360;
}


void mouseClicked() {
  doNotPaint = (doNotPaint + 30) % 360;
}