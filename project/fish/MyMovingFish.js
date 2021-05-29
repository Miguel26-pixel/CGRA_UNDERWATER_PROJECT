import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
	constructor(scene) {
		super(scene, new MyFish(scene));
        this.scene = scene;
        this.reset();
    }
    reset(){
        super.reset();
        this.tailOri = 1;
        this.leftOri = 1;
        this.rightOri = 1;

        this.obj.angTail = 0;
        this.obj.angLFin = 0;
        this.obj.angRFin = 0;
        
        this.limitSup = 3;
        this.limitInf = -4;
        this.yMaxVel = 0.05;
        this.yVel = 0;
        this.obj.rock = null;
        this.pos[1] = this.limitSup;
    }
    update(t) {
        super.update(t);
        if (this.pos[1] >= this.limitSup && this.yVel > 0) {
            this.yVel = 0;
        }
        else if (this.pos[1] <= this.limitInf && this.yVel < 0) {
            this.yVel = 0;
        }
        this.pos[1] += this.yVel*this.scene.speedFactor;


        if ( Math.abs(this.obj.angTail) > Math.PI/9) {
            this.tailOri = -this.tailOri;
        }
        if ( this.obj.angLFin > Math.PI/9 || this.obj.angLFin < 0) {
            this.leftOri = -this.leftOri;
        }
        if ( this.obj.angRFin > Math.PI/9 || this.obj.angRFin < 0) {
            this.rightOri = -this.rightOri;
        }

        this.obj.angTail = this.obj.angTail + this.tailOri*(3+Math.abs(this.vel)*15)*Math.PI/180;
        this.obj.angLFin = this.obj.angLFin + this.leftOri*(2)*Math.PI/180;
        this.obj.angRFin = this.obj.angRFin + this.rightOri*(2)*Math.PI/180;
    }
    

    display() {
        this.scene.pushMatrix();
        super.applyMovement();
        this.scene.translate(25,0,25);
        super.display();
        this.scene.popMatrix();
    
    }
      
    
}

