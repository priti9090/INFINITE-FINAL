var space,
  spaceimage,
  rocket,
  rocketimage,
  bomb,
  bombimage,
  bg,
  sg,
  star,
  starimage;
var gamestate = "play";
var score = 0;

function preload() {
  spaceimage = loadImage("space.jpg");
  rocketimage = loadImage("rocket.png");
  bombimage = loadImage("bomb.png");
  starimage = loadImage("star.png");
}

function setup() {
  createCanvas(400, 400);

  space = createSprite(200, 200, width, height);
  space.addImage("space", spaceimage);
  space.velocityY = 4;

  rocket = createSprite(200, 300, 50, 50);
  rocket.addImage("rocket", rocketimage);
  rocket.scale = 0.4;

  bg = createGroup();
  sg = createGroup();
}

function draw() {
  background(0);
  drawSprites();

  textSize(20);
  text("Score  - " + score, 20, 40);

  if (gamestate == "play") {
    score = score + Math.round(getFrameRate() / 60);
    if (space.y > 300) {
      space.y = 100;
    }
    if (keyDown(UP_ARROW)) {
      rocket.y -= 4;
    }
    if (keyDown(RIGHT_ARROW)) {
      rocket.x += 4;
    }
    if (keyDown(LEFT_ARROW)) {
      rocket.x -= 4;
    }
    if (keyDown(DOWN_ARROW)) {
      rocket.y += 4;
    }

    if (frameCount % 60 == 0) {
      star = createSprite(600, 80);
      star.velocityY = 4;
      star.scale=0.2
      star.addImage("star", starimage);
      star.y = Math.round(random(4, 10));
      sg.add(star);
    }

    if (frameCount % 70 == 0) {
      bomb = createSprite(random(0, 350), random(0, 350));
      bomb.addImage("bomb", bombimage);
      bomb.scale = 0.1;
      bomb.velocityX = random(-2, -10);
      bomb.velocityY = random(2, 10);
      bg.add(bomb);
    }

    if (bg.isTouching(rocket)) {
      gamestate = "end";
    }
  } else if (gamestate == "end") {
    space.velocityY = 0;
    rocket.velocityY = 0;
    bg.setVelocityYEach(0);
    sg.setVelocityYEach(0);
  }
}
