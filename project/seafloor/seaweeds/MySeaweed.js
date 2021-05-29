import {CGFobject} from '../../../lib/CGF.js';
import {MyStackPyramid} from '../../utils/MyStackPyramid.js';

export class MySeaweed extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
    constructor(scene, scale, translate_x, translate_z, rotate) {
        super(scene);
        this.scene = scene;
        this.scale = scale;
        this.translate_x = translate_x;
        this.translate_z = translate_z;
        this.rotate = rotate;
        this.randomColor = Math.random()*3;

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the sphere buffers
     * TODO: DEFINE TEXTURE COORDINATES
     */
    initBuffers() {
        this.seaweed = new MyStackPyramid(this.scene,1.0, Math.random()*1.5+0.5, 4, 4);
    }

    display() {
        
        this.scene.pushMatrix();
        //this.scene.translate(10, 0, 10);
        this.scene.translate(this.translate_x, 0, this.translate_z);
        this.scene.scale(0.1, this.scale, 0.1);
        this.scene.rotate(Math.PI,0,1,1);

        // if(this.randomColor < 1)
        //         this.scene.green.apply();
        // else if(this.randomColor < 2)
        //     this.scene.light_green.apply();
        // else
        //     this.scene.dark_green.apply();

        this.seaweed.display();
        this.scene.popMatrix();
}

}
