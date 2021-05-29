import {CGFobject, CGFtexture, CGFappearance} from '../../../lib/CGF.js';
import { MyPerolSet } from './MyPerolSet.js';
import {MyShell} from './MyShell.js';

export class MyNest extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.rock_list = [];

    this.shell = new MyShell(this.scene, 40, 40);
    this.perolset = new MyPerolSet(this.scene, 10);

  }

  display(){
    this.shell.display();
    if(this.shell.shell_angle!= 0){
      this.scene.pushMatrix();
      for(var i = 0; i < this.rock_list.length; i++){
          this.scene.translate(this.rock_list[i].randomInNest,1.0,this.rock_list[i].randomInNest);
          this.scene.rotate(this.rock_list[i].rotate,0,1,0);
          this.scene.scale(this.rock_list[i].scale,this.rock_list[i].scale,this.rock_list[i].scale);
          this.scene.perolmaterial.apply();
          this.rock_list[i].display();
      }
      this.scene.popMatrix();
    }

    //display perols
    this.scene.pushMatrix();
    this.scene.translate(40,0,40);
    for(var i = 0; i < 20 ; i++){
      this.perolset.perols_list[i].display();
    }
    this.scene.popMatrix();

    
  }


}
