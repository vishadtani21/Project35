var balloon;

var balloonImg1,balloonImg2,balloonImg3;

var database;
var position;


function preload (){

  bgImg = loadImage("Hot Air Ballon-01.png");

  balloonImg1 = loadImage ("Hot Air Ballon-02.png");
  balloonImg2 = loadImage ("Hot Air Ballon-03.png");
  balloonImg3 = loadImage ("Hot Air Ballon-04.png");

}


function setup() {
  createCanvas(1300,700);
  database = firebase.database();

  balloon=createSprite(150, 550, 10, 10);
  balloon.addImage ("balloon2",balloonImg2);
  balloon.scale=0.6;

  var balloonPosition = database.ref ('balloon/position');
  balloonPosition.on ("value",readPosition, showError);
  
}

function draw() {
  background(bgImg);
  
  textSize(20);
  fill ("black");
  stroke ("red");
  text ("Use Arrow keys to move Hot Air Balloon !!!",450,30);

  if(keyDown(UP_ARROW) && balloon.y>=160){
   updatePosition(0,-5);
   balloon.addImage ("balloon1",balloonImg1);
   balloon.scale = balloon.scale + 0.007;

  }

  if(keyDown(DOWN_ARROW) && balloon.y<=550){
   updatePosition(0,+5);
   balloon.addImage ("balloon2",balloonImg2);
   balloon.scale = balloon.scale - 0.007;

  }

  if(keyDown(LEFT_ARROW) && balloon.x>=90){
   updatePosition(-5,0);
   balloon.addImage ("balloon3",balloonImg3);
   balloon.scale = balloon.scale - 0.007;
  }

  if(keyDown(RIGHT_ARROW) && balloon.x<=1210){
   updatePosition(+5,0);
   balloon.addImage ("balloon1",balloonImg1);
   balloon.scale = balloon.scale + 0.007;
  }
  
  balloon.display();

  
  drawSprites();
}

function updatePosition (x,y) {
  database.ref ('balloon/position').set ({
    'x':position.x+x,
    'y':position.y+y
  })
}

function readPosition (data){

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError (){
  console.log("Error in writing to the database");
}

