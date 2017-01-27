const NUMBER_OF_SHOTS = 5;

function cannonClass(){
  this.shotArray = [];

  this.cannonFire = function(){
    if(this.shotArray.length < NUMBER_OF_SHOTS) {
      var tempShot = new shotClass();
      this.shotArray.push(tempShot);
      tempShot.reset();
    }
  }

  this.iterateThroughEnemyArray = function(colliders, ship){
    for(var c = 0; c < colliders.length; c++){
      this.iterateThroughShotArray(colliders, c, ship);
      this.removeDeadShots(this.shotArray);
    }
  }

  this.iterateThroughShotArray = function(colliders, currentCollider, ship){
    for(var i = 0; i < this.shotArray.length; i++){
      if(this.shotArray[i].isShotReadyToFire()){
        this.shotArray[i].shootFrom(ship);
      }
      if( this.shotArray[i].hitTest(colliders[currentCollider]) ) {

        scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
        scoreMultiplier++;

        if(colliders[currentCollider].type == 'asteroid'){
          //colliders[currentCollider].reset(asteroidPic);
          var tempAsteroid = new asteroidClass();
          tempAsteroid.reset(asteroidPic2);
          tempAsteroid.shootFrom(colliders[currentCollider]);
          colliders.push(tempAsteroid);
          colliders.splice(currentCollider, 1);
        }

        this.shotArray[i].reset();
        score += 100 * scoreMultiplier;
      }
      if(this.shotArray[i].shotLife > 0){
        this.shotArray[i].move();
      }
    }
  }

  this.removeDeadShots = function(){
    for(var i = this.shotArray.length-1; i >= 0; i--){
     if(this.shotArray[i].shotLife < 1){
       this.shotArray.splice(i,1);
     }
    }
  }

  this.drawShots = function(){
    for(var i = 0; i< this.shotArray.length; i++){
      if(this.shotArray[i].shotLife > 0){
        this.shotArray[i].draw();
      }
    }
  }
}
