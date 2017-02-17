const NUMBER_OF_SHOTS = 1;

function cannonClass(){
  this.shotArray = [];

  this.cannonFire = function(){
    if(this.shotArray.length < NUMBER_OF_SHOTS) {
      if(peaShooterActive)
        var tempShot = new shotClass();
      if(railGunActive){
        var tempShot = new railSlugClass();
      }
      this.shotArray.push(tempShot);
      tempShot.reset();
    }
  }

  this.iterateShotsandColliders = function(colliders, ship){
    this.iterateThroughShotArray(colliders, ship);
    this.removeDeadShots(this.shotArray);
  }

  this.iterateThroughShotArray = function(colliders, ship){
    if(colliders.length < (START_NUMBER_OF_ASTEROIDS/2)){
      spawnAndResetAsteroids();
    }
    for(var i = 0; i < this.shotArray.length; i++){
      if(this.shotArray[i].isShotReadyToFire()){
        this.shotArray[i].shootFrom(ship);
      }
      for(var currentCollider = 0; currentCollider < colliders.length; currentCollider++){
        if( this.shotArray[i].hitTest(colliders[currentCollider]) ) {

          scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
          scoreMultiplier++;

          if(colliders[currentCollider].type == 'asteroid'){
            colliders[currentCollider].hp -= this.shotArray[i].attackValue;
            if(colliders[currentCollider].hp < 0){
              destroyAsteroid(colliders, colliders[currentCollider], currentCollider);
              //THE EXPLOSION DOES THE KILLING, i think NOT THE RAIL ITSELF
              /*
              var tempExplosion = new explosionClass();
              tempExplosion.reset(explosionPic);
              explosions.push(tempExplosion);
              tempExplosion.explodeAtPoint(colliders[currentCollider]);
              */
            }
          }

          this.shotArray[i].reset();
          score += 100 * scoreMultiplier;
        }
      }//loop through colliders.
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
