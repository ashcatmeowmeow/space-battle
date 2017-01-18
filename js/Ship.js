const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const NUMBER_OF_SHOTS = 5;

const MULTIPLIER_LIFESPAN = 150;

var scoreMultiplier = 0;
var scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;

shipClass.prototype = new movingWrapPositionClass();

function shipClass() {

	this.myShotArray = [];

	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.ang = 0;
	this.xv = 0;
	this.yv = 0;
	this.myShipPic; // which picture to use
	this.name = "Untitled Ship";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

  this.keyHeld_Fire = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey, shotKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyForShotFire = shotKey;
	}

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myShipPic = whichImage;
		this.speed = 0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	} // end of shipReset func


  this.checkMyShipCollisonAgainst = function(thisEnemy) {
    if( thisEnemy.isOverlappingPoint(this.x,this.y) ) {
      this.reset();
      console.log('u d.e.d dead');
			loadLevel();
    }
  }

	this.checkMyShipCollisonAgainstAsteroid = function(thisAsteroid) {
		if( thisAsteroid.isOverlappingPoint(this.x,this.y) ) {
			this.reset();
			console.log('u d.e.d dead');
			loadLevel();
		}
	}

	this.superClassMove = this.move;
	this.move = function(thisEnemy, thisAsteroid) {

	if(scoreMultiplierLifeSpan > 0){
		scoreMultiplierLifeSpan--;
	}

	if(scoreMultiplierLifeSpan == 0){
		scoreMultiplier = 0;
	}

		if(this.keyHeld_Gas) {
			this.xv += Math.cos(this.ang) * THRUST_POWER;
			this.yv += Math.sin(this.ang) * THRUST_POWER;
		}
		if(this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE*Math.PI;
    }
    if(this.keyHeld_TurnRight) {
      this.ang += TURN_RATE*Math.PI;
    }

		this.xv *= SPACESPEED_DECAY_MULT;
    this.yv *= SPACESPEED_DECAY_MULT;

		this.superClassMove();
		this.checkMyShipCollisonAgainst(thisEnemy);
		this.checkMyShipCollisonAgainstAsteroid(thisAsteroid);
    this.iterateThroughShotArray(thisEnemy);
	}

  this.iterateThroughShotArray = function(thisEnemy){
    for(var i = 0; i< this.myShotArray.length; i++){
      if(this.myShotArray[i].isShotReadyToFire()){
        this.myShotArray[i].shootFrom(this);
      }
      if( this.myShotArray[i].hitTest(thisEnemy) ) {
				scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
				scoreMultiplier++;
        thisEnemy.reset(UFOPic);
        this.myShotArray[i].reset();
				//TODO hook this variable up to some logic
				score += 100 * scoreMultiplier;
        console.log('UFO blasted');
      }
      if(this.myShotArray[i].shotLife > 0){
        this.myShotArray[i].move();
      }
    }
    for(var i = this.myShotArray.length-1; i >= 0; i--){
     if(this.myShotArray[i].shotLife < 1){
       this.myShotArray.splice(i,1);
     }
    }
  }

	this.draw = function() {
    for(var i = 0; i< this.myShotArray.length; i++){
      if(this.myShotArray[i].shotLife > 0){
        this.myShotArray[i].draw();
      }
    }
		drawBitmapCenteredWithRotation(this.myShipPic, this.x,this.y, this.ang);
	}

  this.cannonFire = function(thisEnemy){
    if(this.myShotArray.length < NUMBER_OF_SHOTS) {
      var tempShot = new shotClass();
      tempShot.reset();
      this.myShotArray.push(tempShot);
    }
  }
}
