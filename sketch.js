let s = {w: 1080, h: 1920};

let textbits = [];
let ipdY, updY;
let ipdX, updX;
ipdX = s.w/2;

let wordMargin = 20;

let timer2024 = 0;
let pos2024 = 0;
let bg2024initpos = [];
let bg2024newpos = [];
let sequence2024tint = 127;

let montserrat;

let r1 = {x: 0, y: 0};
let r2 = {x: 0, y: 0};

let anglespeed = 30;

let flower = {img: '', x_mid: s.w/2, y_mid: s.h/2, speed: anglespeed};
let flower2;

let star48 = {x_mid: s.w/2, y_mid: s.h/2};
let star4 = {x_mid: s.w/2, y_mid: s.h/2};

let gradient = {h: s.h/2, x: 0, y: s.h};

// squiggly
let squigglies = [];
let angle = 90;
let r = 250;
let squigglytimer = 0;
let squigCounter = 0;

let initXrs, updXrs;
initXrs = s.w + 100;

// states
let screen2up = false;
let screen3draw = false;
let screen4opencall = false;

function preload() {
  textbits[0] = loadImage('assets/Creative.png');
  textbits[1] = loadImage('assets/Coding.png');
  textbits[2] = loadImage('assets/NYC.png');
  textbits[3] = loadImage('assets/Wrapped.png');
  textbits[4] = loadImage('assets/2024.png');

  flower.img = loadImage('assets/flower.svg')
  flower2 = loadImage('assets/flower2.png')

  // load font here
  // montserrat = loadFont('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
}

function setup() {
  createCanvas(s.w, s.h);

  imageMode(CENTER);
  textbits[4].resize(1080, 0);
  // for(let i = 0; i < textbits.length; i++) {
  //   textbits[i].resize(s.w + 20, 0);
  // }
  textbits[4].y = 0;

  flower.img.resize(500, 0);
  flower2.resize(500, 0);

  textAlign(CENTER);
  textFont('Montserrat');

  ipdY = height/2;
  updY = ipdY;

  // 2024
  pos2024 = textbits[4].height/2;

  let temp = 0;
  for(let i = textbits[4].height/2; i < height; i += (textbits[4].height + wordMargin)) {
    bg2024initpos[temp] = i;
    temp++;
  }

  for(let i = 0; i < bg2024initpos.length/2; i++) {
    bg2024newpos[i] = bg2024initpos[i];
    bg2024newpos[bg2024initpos.length-1-i] = bg2024initpos[i];
  }

  // squigglies
  // reference: https://editor.p5js.org/sashasolovyeva/sketches/Cp26nGsAA
  for(let i = 0; i < 200; i++) {
    squigglies[i] = {x: 0, y: 0, inc: i, tint: 0, red: floor(255-i/25)};
    squigglies[i].x = r * cos(angle) + i*3;
    squigglies[i].y = r * sin(angle);

    angle += 0.05;
    r -= 0.1; 
  }
}

function draw() {
  background(52, 10, 209);
  // line(0, height/4, width, height/4);
  

   // 2024
   for(let i = 0; i < bg2024initpos.length; i++) {
    tint(255, sequence2024tint);
    image(textbits[4], width/2, bg2024initpos[i]);
  }

  // moving image
  tint(255, 255);
   image(textbits[4], width/2, pos2024);
   if(millis() >= 500+timer2024) {
    pos2024 += textbits[4].height + wordMargin;
    timer2024 = millis();

    // change of state
    if(pos2024 >= height) {
      screen2up = true;
    }
   }

  noStroke();

  // star
  fill(203, 240, 109, 220);
  push();
    translate(star48.x_mid, star48.y_mid);
    // rotate(frameCount/-anglespeed);
    // star(0, 0, width/2 + 20, width/2 + 200, 44);
  pop();

  fill('#C9A1FF');
  push();
    translate(star4.x_mid, star4.y_mid);
    rotate(frameCount/-anglespeed);
    star(0, 0, 100, width/2 + 300, 4);
  pop();

  // flower
  // push();
  //   translate(flower.x_mid, flower.y_mid);
  //   // rotate(frameCount/-flower.anglespeed);
  //   // image(flower.img, 0, 0);
  // pop();

  // let flowerNumPerRow = 8;
  // flower.img.resize(width / flowerNumPerRow, 0);

  // for(let i = 0; i < 4; i++) {
  //   for(let j = 0; j < flowerNumPerRow; j++) {
  //     image(flower.img, flower.img.width/2 + j * flower.img.width, i * flower.img.height/2);
  //   }
  // }


  // CCNYC text
  image(textbits[0], ipdX, updY - 139 - 139/2 - wordMargin*2);
  image(textbits[1], ipdX, updY - 139/2 - wordMargin);
  image(textbits[2], ipdX, updY + 139/2 + wordMargin);
  image(textbits[3], ipdX, updY + 149 + 139/2 + wordMargin*2);

  // STATES

  // SCREEN 2
  if(screen2up) {
    // 2024 positions and coloring
    for(let i = 0; i < bg2024initpos.length; i++) {
      if(bg2024initpos[i] > bg2024newpos[i]) {
        bg2024initpos[i] -= (bg2024initpos[i] - bg2024newpos[i]) / 20;

        if(sequence2024tint >= 80) {
          sequence2024tint -= 1;
        }
      } 
    }

    // moving the star away
    star4.y_mid -= 7;

    // title text positions
    if(updY > height/2 - 400) {
      updY -= 7;
    } else {
      screen3draw = true;
    }

    // creating the gradient and moving it up
    createGradient();
    if(gradient.y > height/2 + 10) {
      gradient.y -= 7;
    }
  }

  // SCREEN 3
  if(screen3draw) {
    for(let i = 0; i < squigglies.length; i++) {
      fill(squigglies[i].red, 100, 73, squigglies[i].tint);
      noStroke();
      push();
      translate(squigglies[i].inc + 250, squigglies[i].inc*.1 + height - 400);
      rect(squigglies[i].x, squigglies[i].y, 20, 20);
      pop();
    }

    if(squigCounter < squigglies.length - 5) {
      let i = squigCounter;

      squigglies[i].tint = 255;

      console.log(squigglies[i].tint);

      squigCounter++;

    } else {
      screen4opencall = true;
    }

    noStroke();
    fill(255);
    textSize(48);
    text("An end-of-year\ncreative coding showcase\n\nDecember 11th\n6pm-9pm\n\nChemistry Creative\n305 Ten Eyck St",
      width/2, ipdY + 150);


    // SCREEN 4
    if(screen4opencall) {
      updXrs = width - 100;
      updX = width/2 - 200;

      if(initXrs > updXrs) {
        initXrs -= 5;
      }

      // if(ipdX > updX) {
      //   ipdX -= 5;
      // }

      push();
        angleMode(DEGREES);
        translate(initXrs, 125);
        rotate(45 + frameCount);
        image(flower.img, 0, 0);
      pop();

      push();
        translate(initXrs, 125);
        rotate(15);
        textStyle(BOLD);
        textSize(56);
        text("OPEN\nCALL", 0, 0);
      pop();

      textStyle(NORMAL);
    }
  }

    // squiggly(angle, r, inc);
    // nx++;
  // }

  // if(updY > height/3) {
  //   updY -= 5;
  // } else {
  //   noStroke();
  //   fill(255);
  //   text("An end-of-year\ncreative coding showcase\n\nDecember 11th\n6pm-9pm\n\nChemistry Creative\n305 Ten Eyck St",
  //      width/2, ipdY + 180);
  // }
 
}

// star function
function star(x, y, radius1, radius2, npoints) {
  angleMode(RADIANS);
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


// gradient
// reference: https://editor.p5js.org/J_Silva/sketches/mJslozHWg
function createGradient(){
  for(let y=gradient.y; y<gradient.y+gradient.h; y++){
    n = map(y,gradient.y,gradient.y+gradient.h,0,1);

    let c1 = color(255, 0);
    let c2 = color(203, 240, 109, 230);

    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0, y, width, y);
  }
}

// function squiggly(angle, r, inc) {
//   fill('#F06449'); // Set stroke color
//   translate(inc, 200);
//   let x = r * cos(angle) + inc;
//   let y = r * sin(angle);
//   rect(x, y, 30, 30);

//   angle += 0.04;
//   r -= 0.2; 
//   inc += 1;
// }


