void setup(){
  size(300, 300);
  background(255);
  
  for(int i = 0; i <= 29; i++){
    lineasSuperiores(i);
    lineasDerechas(i);
    lineasInferiores(i);
    lineasIzquierdas(i);
  }
}

void lineasSuperiores(int x){
  stroke(0,0,0);
  pushMatrix();
  translate(x*10,0);
  rotate(radians(x*3));
  line(0,0,300,0);
  popMatrix();
}

void lineasDerechas(int y){
  stroke(255,0,0);
  pushMatrix();
  translate(299,y*10);
  rotate(radians(y*3));
  line(0,0,0,299);
  popMatrix();
}

void lineasInferiores(int x){
  stroke(0,255,0);
  pushMatrix();
  translate(0,x*10);
  rotate(radians(-x*3));
  line(0,0,0,299);
  popMatrix();
}

void lineasIzquierdas(int y){
  stroke(0,0,255);
  pushMatrix();
  translate(y*10,0);
  rotate(radians(y*3));
  line(0,0,0,299);
  popMatrix();
}
