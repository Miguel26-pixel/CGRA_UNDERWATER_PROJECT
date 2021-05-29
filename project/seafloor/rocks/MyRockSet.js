import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MyRock } from "./MyRock.js";


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, number_rocks) {
		super(scene);
        this.scene = scene;
        this.number_rocks = number_rocks;
        this.rocks_list = [];
        for(var i = 0; i < number_rocks; i++) {
            this.rocks_list.push(new MyRock(this.scene, 16, 8, Math.random()*0.2, Math.random()*50,Math.random()*50, 0));
        }

	}

}
