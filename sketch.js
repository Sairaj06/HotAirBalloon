var balloon, database;
var position;
var bg;

function preload(){
  bg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png")
}

function setup(){
  database = firebase.database();
  console.log(database);

  createCanvas(1000,600);
  balloon = createSprite(150, 300, 50, 50);
  balloon.addAnimation("balloonAni",balloonImg)
  balloon.scale = 0.4;
 
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight, showError);
}

function draw(){
  background(bg); 

  textSize(15);
  fill("black");
  stroke("black");
  text("Use Arrow key to move the Hot Air balloon",50,30);

if(keyDown(LEFT_ARROW)){
  balloon.x = balloon.x - 10;
   balloon.addAnimation("balloonAni",balloonImg);
}
 if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x + 10;
  balloon.addAnimation("balloonAni",balloonImg);
}
 if(keyDown(UP_ARROW)){
  balloon.y = balloon.y-10;
  balloon.addAnimation("balloonAni",balloonImg);
  balloon.scale=balloon.scale -0.005;
}
 if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y + 10;
  balloon.addAnimation("hotAirBalloon",balloonImg);
  balloon.scale=balloon.scale+0.005;
}

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}