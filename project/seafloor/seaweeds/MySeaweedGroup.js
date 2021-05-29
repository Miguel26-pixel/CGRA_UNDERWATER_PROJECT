import { CGFobject } from '../../../lib/CGF.js';
import { MySeaweed } from "./MySeaweed.js";


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaweedGroup extends CGFobject {
	constructor(scene, number_seaweeds) {
		super(scene);
        this.scene = scene;
        this.number_seaweeds = number_seaweeds;
        this.seaweeds_list = [];
        this.randomX = Math.random()*30+10;
        this.randomY = Math.random()*30+10;
        for(var i = 0; i < number_seaweeds; i++) {
            this.seaweeds_list.push(new MySeaweed(this.scene, Math.random()*0.5+1, this.randomX + (Math.random()*2-1), this.randomY + (Math.random()*2-1), 0));
        }

	}

    display() {
        this.scene.pushMatrix();
        for(var i = 0; i < this.number_seaweeds; i++) {
            this.seaweeds_list[i].display();
        }
        this.scene.popMatrix();
    }
}
