"use strict";

/**
 * @module SmokeParticles
 * A class for managing bullets in-game
 * We use a Float32Array to hold our bullet info,
 * as this creates a single memory buffer we can
 * iterate over, minimizing cache misses.
 * Values stored are: positionX, positionY, velocityX,
 * velocityY in that order.
 */
module.exports = exports = SmokeParticles;

/**
 * @constructor SmokeParticles
 * Creates a SmokeParticles of the specified size
 * @param {uint} size the maximum number of bullets to exits concurrently
 */
function SmokeParticles(maxSize) {
  this.pool = new Float32Array(3 * maxSize);
  this.start = 0;
  this.end = 0;
  this.wrapped = false;
  this.max = maxSize;
}

/**
 * @function emit
 * Adds a new bullet to the end of the SmokeParticles.
 * If there is no room left, no bullet is created.
 * @param {Vector} position where the bullet begins
 * @param {Vector} velocity the bullet's velocity
*/
SmokeParticles.prototype.emit = function(position) {
	if(this.end != this.max){
	  this.pool[3*this.end] = position.x;
	  this.pool[3*this.end+1] = position.y;
	  this.pool[3*this.end+2] = 0.0;
	  this.end++;
	}
}

/**
 * @function update
 * Updates the particles
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {function} callback called with the bullet's position,
 * if the return value is true, the bullet is removed from the pool
 */
SmokeParticles.prototype.update = function(elapsedTime, callback) {
  var i;
  if(wrapped){
	  for(i = 0; i < this.end; i++){
		  this.pool[3*i+2] += elapsedTime;
	  }
	  for(i = this.start; i< this.max; I++){
		  this.pool[3*i+2] += elapsedTime;
	  }
  }else{
	  for(i = this.start; i < this.end; i++){
		  this.pool[3*i+2] += elapsedTime;
	  }
  }
}

/**
 * @function render
 * Renders all bullets in our array.
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
SmokeParticles.prototype.render = function(elapsedTime, ctx) {
  function renderPartible(i){
	  ctx.beginPath();
	  ctx.arc(
		this.pool[3*i,// x position
		this.pool[3*i+1], //y position
		2*this.pool[3*i+2], // radius
		0,
		2*math.PI;
		);
		ctx.fillStyle = 'rgba(60,60,60, ' + 1/(.01+this.pool[3*i+2]) + ')';
		ctx.fill()
	  );
  }
  
  
  var i;
  if(wrapped){
	  for(i = 0; i < this.end; i++){
		  renderParticle.call(this, i);
	  }
	  for(i = this.start; i< this.max; I++){
		  renderParticle.call(this, i);
	  }
  }else{
	  for(i = this.start; i < this.end; i++){
		  renderParticle.call(this, i);
	  }
  }
}
