  
import processing.video.*;
Movie myMovie;
PGraphics img;


// definimos los kernel para las diferentes operaciones
float[][] edgeDetect = { { -1, -1, -1 },
                     { -1,  8, -1 },
                     { -1, -1, -1 } };
                     

float[][] boxBlur = { { 0.111, 0.111, 0.111 },
                     {0.111, 0.111, 0.111  },
                     { 0.111, 0.111, 0.111 } };

float[][] sharpen = { { 0, -1, 0 },
                     { -1,  5, -1 },
                     { 0, -1, 0 } };

PFont f;                   
                     
void setup() {
  size(500, 350);
  img = createGraphics(640, 480);
 
  myMovie = new Movie(this, "video.mov");
  myMovie.loop();
  f = createFont("Arial",16,true);
}

void draw() {
  int value =int(map(mouseX,0,500,0,5));
  textFont(f,18);                  
  fill(255);
  background(0);
  
  
  if(value==0){
    img.beginDraw();
    img.image(myMovie, 0, 0);
    img.endDraw();
    image(img, 80, 5);
    text("FPS: "+frameRate,190,270);
    text("Video Original",190,300);
  }
  if(value==1){
    img.beginDraw();
     img.image(myMovie, 0, 0);
     img.loadPixels();
     img=grey_scale(img);
     img.updatePixels();
     img.endDraw();
     image(img, 80, 5);
     text("FPS: "+frameRate,190,270);
     text("Grises",180,300);
  }
  if(value==2){
     img.beginDraw();
     img.image(myMovie, 0, 0);
     img.loadPixels();
     img.pixels=convolutionApp(img,edgeDetect);
     img.updatePixels();  
     img.endDraw();
     image(img, 80, 5);
     text("FPS: "+frameRate,190,270);
     text("edge Detect",180,300);
  }
  if(value==3){
     img.beginDraw();
     img.image(myMovie, 0, 0);
     img.loadPixels();
     img.pixels=convolutionApp(img,boxBlur);
     img.updatePixels();  
     img.endDraw();
     image(img, 80, 5);
     text("FPS: "+frameRate,190,270);
     text("Box blur",180,300);
  }
  if(value==4){
     img.beginDraw();
     img.image(myMovie, 0, 0);
     img.loadPixels();
     img.pixels=convolutionApp(img,sharpen);
     img.updatePixels();  
     img.endDraw();
     image(img, 80, 5);
     text("FPS: "+frameRate,190,270);
     text("Sharpen",180,300);
  }
 
  println(frameRate);
}

PGraphics grey_scale(PGraphics img){

  img.loadPixels(); 
  for (int y = 0; y < img.height; y++) {
    for (int x = 0; x < img.width; x++) {
      int loc = x + y*img.width;      
      float data = (red(img.pixels[loc])+green(img.pixels[loc])+blue(img.pixels[loc]))/3;  
      img.pixels[loc] =  color(data,data,data);          
    }
  }
  img.updatePixels();
  return img;
}

void movieEvent(Movie m) {
  m.read();
}

color[] convolutionApp(PGraphics img,float[][] matrix){
  color [] result = new color[img.pixels.length];
  for (int x = 0; x < img.width; x++) {
    for (int y = 0; y < img.height; y++ ) {
      int loc = x + y*img.width;
      result[loc] = convolution(x, y, matrix, 3, img);
    }
  }
  return result;
}

color convolution(int x, int y, float[][] m, int sizeM, PImage photo)
{
  float r = 0.0;
  float g = 0.0;
  float b = 0.0;
  int offset = sizeM / 2;
  for (int i = 0; i < sizeM; i++){
    for (int j= 0; j < sizeM; j++){
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + photo.width*yloc;
    
      loc = constrain(loc,0,photo.pixels.length-1);
      // Calculate the convolution
      r += (red(photo.pixels[loc]) * m[i][j]);
      g += (green(photo.pixels[loc]) * m[i][j]);
      b += (blue(photo.pixels[loc]) * m[i][j]);
    }
  }
  
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
  return color(r, g, b);
}
