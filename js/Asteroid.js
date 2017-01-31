const ASTEROID_SPEED = 0.01;
const ASTEROID_COLLISION_RADIUS = 50;
const START_NUMBER_OF_ASTEROIDS = 3;

const ASTEROID_CHILD_SPEED = 1.0;

function spawnAsteroids(){
	for(var i = 0; i <= START_NUMBER_OF_ASTEROIDS; i++){
		colliders.push(new asteroidClass());
	}
}

function resetAsteroids(){
	for(var i = 0; i < colliders.length; i++){
		colliders[i].reset(asteroidPic);
		//console.log(i);
		//console.log(colliders[i]);
	}
}

function moveAsteroids(){
	for(var i = 0; i < colliders.length; i++){
		colliders[i].move();
	}
}

function drawAsteroids(){
	for(var i = 0; i < colliders.length; i++){
		colliders[i].draw();
	}
}

asteroidClass.prototype = new movingWrapPositionClass();

function asteroidClass() {

	this.type = 'asteroid';
	this.x = 100;
	this.y = 100;
	this.xv = 0;
	this.yv = 0;
	this.ang = 0;

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myAsteroidPic = whichImage;
		this.speed = 0;
		//this.x = Math.random()*canvas.width;
		//this.y = Math.random()*canvas.height;
		this.x = 300*Math.random();
		this.y = 300*Math.random();
		this.cyclesTilDirectionChange = 0;
	} // end of asteroidReset func

	this.isOverlappingPoint = function(testX, testY){
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		return (dist <= ASTEROID_COLLISION_RADIUS);
	}

	this.shootFrom = function(asteroidDestroyed){
		this.x = asteroidDestroyed.x;
		this.y = asteroidDestroyed.y;
		this.xv = 0;
		this.yv = 0;
		//TODO you can maybe have the child asteroids fire out in a random direction based on the rock's ang variable.
		this.xv = Math.cos(asteroidDestroyed.ang) * ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
		this.yv = Math.sin(asteroidDestroyed.ang) * ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
		//this.xv = ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
		//this.yv = ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
	}

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		this.xv += 1 * ASTEROID_SPEED;
		this.yv += 1 * ASTEROID_SPEED;
		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;
		this.ang += 1 * ASTEROID_SPEED;
		this.superClassMove();
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myAsteroidPic, this.x,this.y, this.ang);
	}
}
