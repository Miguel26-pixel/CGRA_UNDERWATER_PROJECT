import {CGFobject} from '../../../lib/CGF.js';
import {MyPlane} from "../../utils/MyPlane.js";

export class MyShell extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, pos_x, pos_z) {
    super(scene);
    this.scene = scene;
    this.pos_x = pos_x;
    this.pos_z = pos_z;
    this.shell_angle = 0;
    this.initBuffers();
  }

  initBuffers() {

    this.plane1 = new MyPlane(this.scene, 220, 0, 0, 0 ,0);
    this.plane2 = new MyPlane(this.scene, 220, 0, 0, 0 ,0);

  }

  update_shell(t){
    if(this.shell_angle < Math.PI/2)
      this.shell_angle += t;
  }

  reset_shell(){
    this.shell_angle = 0;
  }

  display() {
    this.scene.pushMatrix();
    
    if(this.shell_angle!=0){
      this.scene.translate(0,1.1,1);
    }
    this.scene.translate(this.pos_x,0.2,this.pos_z);
    this.scene.rotate(Math.PI,0,1,0);
    if(this.shell_angle!=0){
      this.scene.rotate(-this.shell_angle,1,0,0);
    }
    //this.scene.rotate(Math.PI,0,1,0);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(5,5,5);
    //this.scene.shelltexture.apply();
    this.scene.setActiveShader(this.scene.testShaders[3]);
    this.scene.black_shell.bind(1);
    this.scene.color_shell.bind(0);
    this.plane1.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.pos_x,0.4,this.pos_z);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.scale(5,5,5);
    //this.scene.shelltexture.apply();
    this.scene.setActiveShader(this.scene.testShaders[3]);
    this.scene.black_shell.bind(1);
    this.scene.color_shell.bind(0);
    this.plane2.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }


}
