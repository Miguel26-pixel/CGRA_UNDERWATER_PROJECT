import {CGFobject} from '../../lib/CGF.js';
import {MyTriangle} from '../utils/MyTriangle.js';

/**
 * MyFishTail
 * Used to create a tail for MyFish
 * Based on MyTriangle
 */
export class MyFishTail extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {


    this.triangle = new MyTriangle(this.scene);

  }

  setColor(value) {
    this.color = value;
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(0,0,-2.3);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.scale(0.7,0.7,0.7);

    if(this.color < 1)
        this.scene.green.apply();
    else if(this.color < 2)
        this.scene.purple.apply();
    else if(this.color < 3)
        this.scene.red.apply();
    else if(this.color < 4)
        this.scene.orange.apply();

    //this.scene.purple.apply();
    this.triangle.display();
    this.scene.popMatrix();
  }
}
