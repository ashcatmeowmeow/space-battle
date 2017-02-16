const RAIL_SPEED = 18.0;
const RAIL_LIFE = 3000;
const RAIL_DISPLAY_RADIUS = 3;

railSlugClass.prototype = new movingWrapPositionClass();

function railSlugClass() {
	this.attackValue = 4;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;

	this.shotLife = 30;

	this.superClassReset = this.reset;
	this.reset = function() {
		this.superClassReset();
		this.shotLife = 0;
	} // end of shotReset func

	this.isShotReadyToFire = function(){
		if(this.shotLife <= 0){
			return true;
		}
	}

	this.shootFrom = function(shipFiring){
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		if(this.shotLife){
			this.x = shipFiring.x;
			this.y = shipFiring.y;
		}

		this.xv = 0;
		this.yv = 0;
		this.xv = Math.cos(shipFiring.ang) * RAIL_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * RAIL_SPEED + shipFiring.yv;

		this.shotLife = RAIL_LIFE;
	}

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		if(this.shotLife > 0){
			this.shotLife--;
			this.superClassMove();
		}
	}

	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0){
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.draw = function() {
		if(this.shotLife > 0){
			colorCircle(this.x,this.y, RAIL_DISPLAY_RADIUS, "red");
		}
	}
}
