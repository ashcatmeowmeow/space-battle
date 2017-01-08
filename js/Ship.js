const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

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

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey, shotKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyForShotFire = shotKey
	}

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myShipPic = whichImage;
		this.speed = 0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	} // end of shipReset func

	this.cannonFire = function(){
		var tempShot = new shotClass();
		tempShot.reset();
		this.myShotArray.push(tempShot);
	}
	this.superClassMove = this.move;
	this.move = function() {

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
		//NEED TO ITERATE THROUGH THE SHOT ARRAY
		for(var i = 0; i< this.myShotArray.length; i++){
			if(this.myShotArray[i].isShotReadyToFire()){
				this.myShotArray[i].shootFrom(this);
			}
			this.myShotArray[i].move();
		}
	}

	this.draw = function() {
		this.myShot.draw();
		drawBitmapCenteredWithRotation(this.myShipPic, this.x,this.y, this.ang);
	}
}
