

  function setup() {
    var canvas = createCanvas(400, 400);
  canvas.parent('simple-sketch-holder');
    
  
    rSlider = createSlider(1, 200, 50);
    rSlider.position(20, 450);
  }
  
  let r,g,b,n;
  function draw() {
    background(220);
    
    stroke('red');
    r=0;
    for (let i = 0; i <= 1000; i++) {
      line(r, 0, 0, 400-r);
      r+=rSlider.value();
    }
    /*line(50, 0, 0, 400);
    line(100, 0, 0, 350);
    line(150, 0, 0, 300);
    line(200, 0, 0, 250);
    line(250, 0, 0, 200);
    line(300, 0, 0, 150);
    line(350, 0, 0, 100);
    line(400, 0, 0, 50);*/
    
    stroke('green');
    g=0;
    for (let i = 0; i <= 1000; i++) {
      line(g, 0, 400, g);
      g+=rSlider.value();
    }
    /*
    line(0, 0, 400, 50);
    line(50, 0, 400, 100);
    line(100, 0, 400, 150);
    line(150, 0, 400, 200);
    line(200, 0, 400, 250);
    line(250, 0, 400, 300);
    line(300, 0, 400, 350);
    line(350, 0, 400, 400);*/
    
    stroke('blue');
    b=0;
    for (let i = 0; i <= 1000; i++) {
      line(400, b, 400-b, 400);
      b+=rSlider.value();
    }
    /*
    line(400, 350, 0, 400);
    line(400, 300, 50, 400);
    line(400, 250, 100, 400);
    line(400, 200, 150, 400);
    line(400, 150, 200, 400);
    line(400, 100, 250, 400);
    line(400, 50, 300, 400);
    line(400, 0, 350, 400);*/
    
    stroke('black');
    n=400;
    for (let i = 0; i <= 1000; i++) {
      line(0, n, n, 400);
      n-=rSlider.value();
    }
    //line(0,200,200,400)
    /*
    line(0, 0, 50, 400);
    line(0, 50, 100, 400);
    line(0, 100, 150, 400);
    line(0, 150, 200, 400);
    line(0, 200, 250, 400);
    line(0, 250, 300, 400);
    line(0, 300, 350, 400);
    line(0, 350, 400, 400);*/
      
  }