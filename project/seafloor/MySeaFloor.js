import {CGFobject} from '../../lib/CGF.js';
import {MyPlane} from '../utils/MyPlane.js';

import {MyAnimatedFish} from '../fish/MyAnimatedFish.js';


export class MySeaFloor extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
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

    this.plane = new MyPlane(this.scene, 20, 0, 0, 0 ,0);

  }


  display(){
    
    this.scene.pushMatrix();
    this.scene.translate(25,2.9,25);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(50,50,1);
    this.scene.setActiveShader(this.scene.testShaders[1]);
    this.scene.texture2.bind(1);
    this.scene.texture.bind(0);
    this.plane.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();

  }

}
