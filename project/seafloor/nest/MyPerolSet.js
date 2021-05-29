import { CGFobject } from '../../../lib/CGF.js';
import { MyPerol } from "./MyPerol.js";


/**
 * MyPerolSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPerolSet extends CGFobject {
	constructor(scene, number_perols) {
		super(scene);
        this.scene = scene;
        this.number_perols = number_perols;
        this.perols_list = [];
        
    for (var i = 0; i < 20 ; i++){
        this.perols_list.push(new MyPerol(this.scene, 2.5*Math.sin(i*Math.PI/10),2.5*Math.cos(i*Math.PI/10)));
    }
    }
}
