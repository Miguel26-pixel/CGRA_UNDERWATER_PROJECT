import {CGFobject, CGFtexture, CGFappearance} from '../../lib/CGF.js';
import {MyCylinder} from '../utils/MyCylinder.js';

export class MyPillar extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, translate_x, translate_z) {
    super(scene);
    this.scene = scene;
    this.translate_x = translate_x;
    this.translate_z = translate_z;
    this.cylinders_list = [];

    this.initBuffers();

    this.initMaterials();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {

    for(var i = 0; i < 15; i++){
      this.cylinders_list.push(new MyCylinder(this.scene, 200));
    }

  }

  initMaterials() {

    this.pipeTexture = new CGFtexture(this.scene, "images/ferrugem.jpg");

    this.pipematerial = new CGFappearance(this.scene);
    this.pipematerial.setAmbient(0.7,0.7,0.7,1);
    this.pipematerial.setDiffuse(0.9,0.9,0.9,1);
    this.pipematerial.setDiffuse(0.2,0.2,0.2,1);
    this.pipematerial.setShininess(10);
    this.pipematerial.setTexture(this.pipeTexture);
    this.pipematerial.setTextureWrap('REPEAT', 'REPEAT');

  }

  display(){

    this.scene.pushMatrix();
    this.scene.scale(0.5,0.5,0.5);
    this.pipematerial.apply();
    
    for (var i = 0; i < this.cylinders_list.length ; i++){
      this.cylinders_list[i].display();
      if(i != this.cylinders_list.length-1)
        this.scene.translate(0,1,0);
    }
    this.scene.popMatrix();
  
  }


}
