const ASTEROID_SPEED = 0.01;
const ASTEROID_COLLISION_RADIUS = 50;
const START_NUMBER_OF_ASTEROIDS = 3;

const NUMBER_OF_ASTEROID_FRAGMENTS = 3;
const ASTEROID_CHILD_SPEED = 1.5;

function destroyAsteroid(colliders, currentAsteroid, currentAsteroidOffset){
	if(currentAsteroid.size == 'big'){
		/*
		colliders.splice(currentAsteroidOffset, 1);
		for(var i = 0; i < NUMBER_OF_ASTEROID_FRAGMENTS; i++){
			var tempAsteroid = new asteroidClass('small');
			tempAsteroid.reset(asteroidPic2);
			tempAsteroid.shootFrom(currentAsteroid);
			colliders.push(tempAsteroid);
		}
		*/
		colliders.splice(currentAsteroidOffset, 1);
	} else {
		colliders.splice(currentAsteroidOffset, 1);
	}
}

function spawnAsteroids(){
	for(var i = 0; i <= START_NUMBER_OF_ASTEROIDS; i++){
		colliders.push(new asteroidClass('big'));
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

function asteroidClass(size) {

	this.type = 'asteroid';
	this.size = size;
	this.x = 100;
	this.y = 100;
	this.xv = 0;
	this.yv = 0;
	this.ang = Math.random() * Math.PI;

	this.hp = 3;

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myAsteroidPic = whichImage;
		this.speed = 0;
		//this.x = Math.random()*canvas.width;
		//this.y = Math.random()*canvas.height;
		this.x = Math.floor(Math.random() * 800) + 1
		this.y = Math.floor(Math.random() * 600) + 1
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
		this.xv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
		this.yv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
		//this.xv = ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
		//this.yv = ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
	}

	/*
	this.superClassWrap = this.handleScreenWrap //saving reference to parent class' wrap class.
	this.handleScreenWrap = function(){
		var withinBoundaries;
		if(this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height) {
			this.superClassWrap();
		} //check to see if the asteroid is within the boundaries of the canvas
	}
	*/

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		this.xv += Math.cos(this.ang) * ASTEROID_SPEED;
		this.yv += Math.sin(this.ang) * ASTEROID_SPEED;
		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;
		this.superClassMove();
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myAsteroidPic, this.x,this.y, this.ang);
	}
}
