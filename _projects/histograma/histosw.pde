PGraphics pg;
PImage photo;
PImage photoTransform;
PImage histogram;
PFont f; 

void setup() {
  size(1000, 350);
  f = createFont("Arial",15);
  pg = createGraphics(295, 295);
  photo = loadImage("luffy.png");
  photoTransform = loadImage("luffy.png");
  histogram = createImage(300, 300, RGB);
  
}

void draw() {
  
  background(0,0,0);   
  textFont(f,18);                  
  fill(250); 
  
  text("Escala de grises",415,330);                                       
  text("Histograma",750,330);
   
  //renderizamos imagen original
  pg.beginDraw();
  pg.image(photo,0,0);
  pg.endDraw();
  image(pg, 10, 10);
   
  //transformacion a escala de grises
  int pixelLoc;
  color colorGray;
  pg.beginDraw();
  
  
  for (int y = 0; y < photo.height; y++) {
    for (int x = 0; x < photo.width; x++) {      
       pixelLoc= x + y*photo.width;      
       float dataColor = red(photo.pixels[pixelLoc])*0.2126 + green(photo.pixels[pixelLoc])*0.7152 + blue(photo.pixels[pixelLoc])*0.0722;
       colorGray = color(dataColor, dataColor, dataColor);
       photoTransform.pixels[pixelLoc] = colorGray;           
    }
  }
  photoTransform.updatePixels();
  pg.image(photoTransform,0,0);
  pg.endDraw();
  image(pg, 335, 10);
  

  // calculo histograma  
  int[] hist = new int[256];  
 
  // Calculamos el histograma
  for (int i = 0; i < photo.width; i++) 
    for (int j = 0; j < photo.height; j++) {
      //almacenamos el brillo de cada uno de los pixeles
      int bright = int(brightness(photoTransform.get(i, j)));
      //sumamos una unidad al valor que se tiene en la posicion del brillo 
      hist[bright]++;   
    }
  
 

  pg.beginDraw();

  // ponemos el fondo de la imagen blanco
  for (int i = 0; i < histogram.pixels.length; i++) {
    histogram.pixels[i] = color(255, 255, 255); 
  }
  histogram.updatePixels();
  pg.image(histogram,0,0);
  


  for (int i = 0; i < histogram.width; i ++) {
   
    int x = int(map(i, 0, histogram.width, 0, 255));
    
    int y = int(map(hist[x], 0, max(hist),  histogram.height,0));
   
        pg.stroke(0);
        pg.line(i, y, i, histogram.height);
       
  }
  pg.endDraw();
  image(pg, 660, 10);      
  
  
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
       photo = loadImage("luffy.png");
       photoTransform = loadImage("luffy.png");
    } 
    if (keyCode == DOWN) {
       photo = loadImage("prueba.jpg");
       photoTransform = loadImage("prueba.jpg");
    }
     if (keyCode == LEFT) {
       photo = loadImage("prueba3.jpg");
       photoTransform = loadImage("prueba3.jpg");
    }
  }
}