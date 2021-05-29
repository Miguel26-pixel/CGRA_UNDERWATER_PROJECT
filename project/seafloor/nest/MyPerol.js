import {CGFobject, CGFtexture, CGFappearance} from '../../../lib/CGF.js';
import {MySphere} from '../../utils/MySphere.js';

export class MyPerol extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, translate_x, translate_z) {
    super(scene);
    this.scene = scene;
    this.translate_x = translate_x;
    this.translate_z = translate_z;

    this.initBuffers();

  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {


    this.perol = new MySphere(this.scene, 16, 8);


  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(this.translate_x,0.2,this.translate_z);
    this.scene.scale(0.2,0.2,0.2);
    this.scene.perolmaterial.apply();
    this.perol.display();
    this.scene.popMatrix();
  }


}
