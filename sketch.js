var sprite, sprite_running, edges;
var groundImage;
var score=0
var PLAY = 1
var END = 0
var gameState = PLAY

function preload() {
  dodo= loadImage("dodo.png");
  // groundImage = loadImage("chao.png")
  arvoreImg = loadImage("arvore.png")
  crocodiloImg=loadImage("crocodilo.png")
  pedraImg = loadImage("pedra.png")
  bgImg = loadImage("BG.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  gramaImg = loadImage("grama.png");
}

function setup() {
  createCanvas(600, 200);
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5
  
  grama = createSprite(300,100);
  grama.addImage(gramaImg);
  grama.scale=0.5

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.09
  //criando o sprite e adicionando animacao
  bg = createSprite(300, 100, 600, 20)
  bg.addImage(bgImg)
  bg.scale=0.5

  sprite = createSprite(50, 110, 20, 50);
  sprite.addImage(dodo);

  edges = createEdgeSprites();
 
  invisibleGround = createSprite(200, 200, 400, 10)
  invisibleGround.visible = false
  //adicione dimensão e posição 
  sprite.scale = 0.2;
  sprite.x = 50

  arvoreGroup=new Group()
  pedraGroup=new Group()
  crocodiloGroup=new Group()
  gramaGroup=new Group()
}


function draw() {
   background("white");
  if (gameState === PLAY) {   
    bg.visible = true
    bg.velocityX = -5
    if (keyDown("space") && sprite.y >= 100) {
      sprite.velocityY = -10;
    }
    sprite.velocityY = sprite.velocityY + 0.5;
    if (bg.x < 0) {
      bg.x = bg.width /6
    }
    gerarPedra()
    gerarArvore()
    gerarCrocodilo()
    gerarGrama()

    if(pedraGroup.isTouching(sprite) || crocodiloGroup.isTouching(sprite)){
      gameState= END

    }
    if(gramaGroup.isTouching(sprite)){
      for(var i=0; i < gramaGroup.length; i++){
        if(gramaGroup[i].isTouching(sprite)){
          gramaGroup[i].destroy()
          score +=10
        }
      }
      
     }
  }
  
  else if(gameState ===END){
    gameOver.visible = true;
    restart.visible = true;
    grama.visible=false
    crocodiloGroup.setVelocityXEach(0) 
    crocodiloGroup.destroyEach()
    pedraGroup.setVelocityXEach(0) 
    pedraGroup.destroyEach()
    arvoreGroup.setVelocityXEach(0)
    arvoreGroup.destroyEach()
    gramaGroup.setVelocityXEach(0)
    gramaGroup.destroyEach()
    sprite.velocityY=0
    bg.visible = false
    if(mousePressedOver(restart)){
      reset()
    }
  }

  //impedir que o sprite caia
  sprite.collide(invisibleGround)
  
  drawSprites();
  textSize(15)
  fill("black")
  text("Pontuação: "+score, 50,30)  
}

function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  score = 0
}
function gerarArvore(){
  if(frameCount % 210 === 0){
    var arvore = createSprite(600,140,10,60)
    arvore.addImage(arvoreImg)
    arvore.velocityX=-5
    arvore.scale=0.3
    arvoreGroup.add(arvore)
  }
}

function gerarPedra(){
  if(frameCount % 90 === 0){
    var pedra = createSprite(600,180,10,60)
    pedra.addImage(pedraImg)
    pedra.velocityX=-5
    pedra.scale=0.09
    pedraGroup.add(pedra)
  }
}
function gerarCrocodilo(){
  if(frameCount % 150 === 0){
    var crocodilo = createSprite(600,175,10,60)
    crocodilo.debug=true
    crocodilo.setCollider("rectangle", 210,0,400,80)
    crocodilo.addImage(crocodiloImg)
    crocodilo.mirrorX(-1)
    crocodilo.velocityX=-8
    crocodilo.scale=0.3
    crocodiloGroup.add(crocodilo)
  }
}
function gerarGrama(){
  if(frameCount % 150 === 0){
    var grama = createSprite(600,175,10,60)
    grama.addImage(gramaImg)
    grama.velocityX=-5
    grama.scale=0.08
    gramaGroup.add(grama)
  }
}