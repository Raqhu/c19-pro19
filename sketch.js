//defining global variables
var path,CaR,silver,diamonds,gold,sword;
var pathImg,CarIMG,SilverImg,diamondsImg,GoldImg,swordImg;
var stuffCollection = 0;
var SilverG,diamondsG,GoldG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

//preloading images
function preload(){
  pathImg = loadImage("Road.png");
  CarIMG = loadImage("Runner-1.png")
  SilverImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  GoldImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//creating a canvas
createCanvas(windowWidth,windowHeight);

// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating car moving
CaR = createSprite(width/2,height-20,20,20);
CaR.addImage("CarMoving",CarIMG);
CaR.scale=0.5;
  
  //creating groups
SilverG=new Group();
diamondsG=new Group();
GoldG=new Group();
swordGroup=new Group();

}

function draw() {
  //gamestates
  if(gameState===PLAY){
  background(0);
  CaR.x = World.mouseX;
  
  edges= createEdgeSprites();
  CaR.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
  path.y = height/2;
  }
  
    createsilver();
    createDiamonds();
    creategold();
    createSword();
    
    if (SilverG.isTouching(CaR)) {
      SilverG.destroyEach();
      stuffCollection=stuffCollection + 50;
    }
    else if (diamondsG.isTouching(CaR)) {
      diamondsG.destroyEach();
      stuffCollection=stuffCollection + 100;
      
    }else if(GoldG.isTouching(CaR)) {
      GoldG.destroyEach();
      stuffCollection=stuffCollection + 75;
      
    }else{
      if(swordGroup.isTouching(CaR)) {
        gameState=END;
        
        CaR.addAnimation("SahilRunning",endImg);
        CaR.x=width/2;
        CaR.y=height/2;
        CaR.scale=0.6;
        
        SilverG.destroyEach();
        diamondsG.destroyEach();
        GoldG.destroyEach();
        swordGroup.destroyEach();
        
        SilverG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        GoldG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Ores Collected: "+ stuffCollection,width-210,30);
  }

}
//spawning silver
function createsilver() {
  if (World.frameCount % 100 == 0) {
  var silver = createSprite(Math.round(random(50, width-50),40, 10, 10));
  silver.addImage(silverImg);
  silver.scale=0.35;
  silver.velocityY = 5;
  silver.lifetime = 200;
  SilverG.add(silver);
  }
}
//spawning diamonds
function createDiamonds() {
  if (World.frameCount % 400 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.35;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}
//spawning gold
function creategold() {
  if (World.frameCount % 200 == 0) {
  var gold = createSprite(Math.round(random(50, width-50),40, 10, 10));
  gold.addImage(GoldImg);
  gold.scale=0.35;
  gold.velocityY = 5;
  gold.lifetime = 200;
  GoldG.add(gold);
  }
}
//spawning sword
function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }

  if(stuffCollection % 100 == 0) {
    path.velocityY = + 10;
  }
}