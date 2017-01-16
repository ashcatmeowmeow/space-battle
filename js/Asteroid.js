const ASTEROID_SPEED = 6.0;

asteroidClass.prototype = new movingWrapPositionClass();

function asteroidClass() {
	this.x = 100;
	this.y = 100;
	this.xv = 0;
	this.yv = 0;

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myAsteroidPic = whichImage;
		this.speed = 0;
		//this.x = Math.random()*canvas.width;
		//this.y = Math.random()*canvas.height;
		this.x = 300;
		this.y = 300;
		this.cyclesTilDirectionChange = 0;
	} // end of asteroidReset func

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		this.xv += 1;
		this.yv += 1;
		this.superClassMove();
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myAsteroidPic, this.x,this.y, 0);
	}
}
