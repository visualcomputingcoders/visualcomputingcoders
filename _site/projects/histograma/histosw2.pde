PGraphics pg;
PImage photo;
PImage photoTransform;
PImage histogram;
PFont f; 

void setup() {
  size(660, 350);
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
            
  text("Escala de grises",100,330);                                       
  text("Histograma",415,330);
   
  //renderizamos imagen original

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
  photoTransform.filter(GRAY);
  pg.endDraw();

  image(pg, 10, 10);
  

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
  
 
  
  // mapeamos un rango A con el mouse a un rango en el histograma
  int value =int(map(mouseX,330,660,0,256));
  
  // definimos un tamaño de segmento de recorrido en el histograma y la foto
  int start = value;
  int end = value+20;
  
  pg.beginDraw();
  photoTransform.loadPixels();
  
  for (int i = 0; i < photoTransform.width; i++) {
    for (int j = 0; j < photoTransform.height; j++) {
      int loc = i + j*photoTransform.width;
      int bright = int(brightness(photoTransform.get(i, j)));
      // obtenemos el brillo de un pixel si este se encuentra dentro del segmento definimos pintamos de rojo las zonas de la foto
       if(bright>start && bright< end)
          photoTransform.pixels[loc] =  color(20,20,200);  
    }
  }
  
  photoTransform.updatePixels();
  pg.image(photoTransform,0,0);
  pg.endDraw();
  image(pg, 10, 10); 



  pg.beginDraw();

  // ponemos el fondo de la imagen blanco
  for (int i = 0; i < histogram.pixels.length; i++) {
    histogram.pixels[i] = color(255, 255, 255); 
  }
  histogram.updatePixels();
  pg.image(histogram,0,0);
  


  for (int i = 0; i < histogram.width; i ++) {
   
    int x = int(map(i, 0, histogram.width, 0, 255));
    // Convierta el valor del histograma en una ubicación entre la parte inferior y la parte superior de la imagen
    int y = int(map(hist[x], 0, max(hist),  histogram.height,0));
   
      if(x>start && x< end){
        pg.stroke(20,20,200);
        pg.line(i, y, i, histogram.height);
      }else{
        pg.stroke(20);
        pg.line(i, y, i, histogram.height);
      }  
  }
  pg.endDraw();
  image(pg, 335, 10);      
  
  
}