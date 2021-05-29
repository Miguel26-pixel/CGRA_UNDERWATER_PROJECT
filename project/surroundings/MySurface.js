import {CGFobject} from '../../lib/CGF.js';
import {MyPlane} from '../utils/MyPlane.js';

export class MySurface extends CGFobject {
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
    
    this.plane = new MyPlane(this.scene, 200, 0, 0, 0 ,0);

  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(25,7.5,25);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.scale(50,50,50);
    this.scene.setActiveShader(this.scene.testShaders[2]);
    this.scene.distortionmap.bind(1);
    this.scene.waterpier.bind(0);
    this.plane.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();


  }
}
