import { CGFobject } from '../../../lib/CGF.js';
import { MySeaweedGroup } from "./MySeaweedGroup.js";


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaweedSet extends CGFobject {
	constructor(scene, number_seaweeds) {
		super(scene);
        this.scene = scene;
        this.seaweeds_list = [];
        for(var i = 0; i < number_seaweeds; i++) {
            this.seaweeds_list.push(new MySeaweedGroup(this.scene, 5));
        }

	}
}
