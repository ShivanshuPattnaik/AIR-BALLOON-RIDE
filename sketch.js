
// AIR BALLOON RIDE
// BY SHIVANSHU PATTNAIK

// DATABASE {FIREBASE} & POSITION
var database;
var position;

// VARIABLES
var bg;
var balloon, balloonImage, balloonImage2, balloonImage3;
var invisibleG1, invisibleG2;

function preload() {

  balloonImage = loadImage("images/Hot Air Ballon-02.png");
  
  bg = loadImage("images/Hot Air Ballon-01.png");

  balloonImage2 = loadImage("images/Hot Air Ballon-03.png");

  balloonImage3 = loadImage("images/Hot Air Ballon-04.png");

}

function setup() {
  
  var canvas = createCanvas(1300, 600);
  
  balloon = createSprite(150, 435, 50, 50);
  balloon.addImage(balloonImage);
  balloon.scale = 0.6

  invisibleG1 = createSprite(150, 600, 10000, 10);
  invisibleG1.visible = false;
  
  invisibleG2 = createSprite(150, 0, 10000, 10);
  invisibleG2.visible = false;

  database = firebase.database();

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition);

}

function draw() {

  background(bg);

  fill("black");
  textSize(25);
  strokeWeight(3);
  stroke("white");
  textFont("Roboto Mono");
  text("PRESS THE UP ARROW KEY TO TAKE THE AIR BALLOON UP", 300, 50);

  balloon.bounceOff(invisibleG1)
  balloon.bounceOff(invisibleG2)

  if(position !== undefined) {

    if(keyDown("UP_ARROW")) {
    
      writePosition(0, -10);
      balloon.addImage(balloonImage2);
      balloon.scale -= 0.01;
  
    }
    if(keyDown("DOWN_ARROW")) {
      
      writePosition(0, 10);
      balloon.addImage(balloonImage3);
      balloon.scale += 0.01;
  
    }
    if(keyDown("LEFT_ARROW")) {
      
      writePosition(-10, 0);
      balloon.addImage(balloonImage);
  
    }
    if(keyDown("RIGHT_ARROW")) {
      
      writePosition(10, 0);
      balloon.addImage(balloonImage);
  
    }

  }

  drawSprites();

}

function readPosition(data) {

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function writePosition(x, y) {

  database.ref("balloon/position").set({

    "x" : position.x + x,
    "y" : position.y + y

  });

}
