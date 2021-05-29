import {CGFobject} from '../../lib/CGF.js';

import {MyAnimatedFish} from '../fish/MyAnimatedFish.js';

import {MyNest} from '../seafloor/nest/MyNest.js';
import {MyRockSet} from '../seafloor/rocks/MyRockSet.js';
import {MySeaweedSet} from '../seafloor/seaweeds/MySeaweedSet.js';
import {MyPillar} from '../seafloor/MyPillar.js';


export class MySeaElements extends CGFobject {
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

    this.rockset = new MyRockSet(this.scene, 30);
    this.pillar1 = new MyPillar(this.scene,30,22);
    this.pillar2 = new MyPillar(this.scene,30,25);
    this.pillar3 = new MyPillar(this.scene,37,22);
    this.pillar4 = new MyPillar(this.scene,37,25);
    this.nest = new MyNest(this.scene);
    this.animated_fish1 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.animated_fish2 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.animated_fish3 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.animated_fish4 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.animated_fish5 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.animated_fish6 = new MyAnimatedFish(this.scene, Math.random()*4, 0.04);
    this.seaweedset = new MySeaweedSet(this.scene, 20);

  }

  update_anim_fish(t){
    this.animated_fish1.update(t);
    this.animated_fish2.update(t);
    this.animated_fish3.update(t);
    this.animated_fish4.update(t);
    this.animated_fish5.update(t);
    this.animated_fish6.update(t);
  }

  update(t){
    this.nest.shell.update_shell(t);
  }

  reset(){
    this.nest.shell.reset_shell();
  }

  display(){

    if(this.scene.displayRocks)
        this.displayRocks();

    if(this.scene.displayPillars)
        this.displayPillars();
    
    if(this.scene.displayNest)
        this.displayNest();

     if(this.scene.displayAnimatedFish)
        this.displayAnimatedFish();

    if(this.scene.displaySeaWeeds)
        this.displaySeaweed();

  }

  displayRocks(){
    for(var i = 0; i < this.rockset.rocks_list.length ; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.rockset.rocks_list[i].translate_x,0.0,this.rockset.rocks_list[i].translate_z);
      this.scene.rotate(this.rockset.rocks_list[i].rotate,0,1,0);
      this.scene.scale(this.rockset.rocks_list[i].scale,this.rockset.rocks_list[i].scale,this.rockset.rocks_list[i].scale);
      this.scene.perolmaterial.apply();
      this.rockset.rocks_list[i].display();
      this.scene.popMatrix();
    }
  }

  displayPillars(){
      this.scene.pushMatrix();
      this.scene.translate(this.pillar1.translate_x,0,this.pillar1.translate_z);
      this.pillar1.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.pillar2.translate_x,0,this.pillar2.translate_z);
      this.pillar2.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.pillar3.translate_x,0,this.pillar3.translate_z);
      this.pillar3.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.pillar4.translate_x,0,this.pillar4.translate_z);
      this.pillar4.display();
      this.scene.popMatrix();
  }

  displayNest(){
    this.nest.display();
  }

  displayAnimatedFish(){
    this.animated_fish1.display();
    this.animated_fish2.display();
    this.animated_fish3.display();
    this.animated_fish4.display();
    this.animated_fish5.display();
    this.animated_fish6.display();
  }

  displaySeaweed(){
    this.scene.pushMatrix();
    //this.scene.translate(10,0,10);
    this.scene.setActiveShader(this.scene.testShaders[4]);
    for(var i = 0; i < 20 ; i++){
      this.seaweedset.seaweeds_list[i].display();
    }
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }

}
