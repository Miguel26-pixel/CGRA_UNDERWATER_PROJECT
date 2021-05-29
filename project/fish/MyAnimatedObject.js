import {CGFobject} from '../../lib/CGF.js';

/**
 * MyAnimatedObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnimatedObject extends CGFobject {
	constructor(scene, obj) {
		super(scene);
		this.obj = obj;
        this.startX = Math.random()*30+5;
        this.startZ = Math.random()*30+5;
		this.startY = Math.random()*7+5;
		this.reset();
	}

	move(value){
		this.pos = value;
	}

    change_ang(value){
        this.ang = value;
    }

	reset() {
		this.pos = [this.startX,this.startY,this.startZ];
		this.ang = Math.PI/2;
		this.vel = 0;
	}

	display(){

		this.scene.pushMatrix();
		this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.rotate(this.ang,0,1,0);
		this.scene.rotate(Math.PI/2,1,0,0);
        this.obj.display();
        this.scene.popMatrix();
		
	}
}

