import {CGFobject} from '../../lib/CGF.js';

/**
 * MyMovingObject
 * Used as a base for MyMovingFish
 */
export class MyMovingObject extends CGFobject {
	/**
	 * @constructor
 	 * @param scene - Reference to MyScene object
 	 */
	constructor(scene, obj) {
		super(scene);
		this.obj = obj;
		this.reset();
	}


	update(t) {
		this.pos[0] += this.vel*t*this.scene.speedFactor*Math.sin(this.ang);
		this.pos[2] += this.vel*t*this.scene.speedFactor*Math.cos(this.ang);
	}
	
	applyMovement() {
		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
		this.scene.rotate(this.ang, 0, 1, 0);
		this.scene.popMatrix();
	}

	moveUP(value) {
		if(this.angY < 5) {
			this.angY += value;
		}
	}

	moveDOWN(value) {
		console.log(value);
		if(this.angY > -0.2) {
			this.angY -= value;
		}
	}
		
	turn(val){
		this.ang += val;
		if(val > 0)
			this.angLFin = 0;
	}

	accelerate(val){
		this.vel += val*this.scene.speedFactor;
	}

	move(value){
		this.pos = value;
	}

	reset(){
		this.pos = [0,3,0];
		this.ang = 0;
		this.vel = 0;
		this.angY = 0;
		this.obj.rock = null;
	}

	display(){

		this.scene.pushMatrix();
        this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);
		this.scene.rotate(this.ang,0,1,0);
		this.scene.translate(-this.pos[0],-this.pos[1],-this.pos[2]);
		this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);
		this.scene.translate(0,this.angY,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.obj.display();
        this.scene.popMatrix();
		
	}
}

