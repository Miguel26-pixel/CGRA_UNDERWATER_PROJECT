import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../../lib/CGF.js';
import {MyTriangle} from '../utils/MyTriangle.js';
import {MyFishBody} from './MyFishBody.js';
import {MyFishTail} from './MyFishTail.js';
import {MyFishTopFin} from './MyFishTopFin.js';
import {MyFishFin} from './MyFishFin.js';
import {MyFishEye} from './MyFishEye.js';


/**
 * MyFish
 * Used by MyMovingFish and MyAnimatedFish
 * Creates a fish with a random body texture
 */
export class MyFish extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene) {
    super(scene);
    this.scene = scene;
    
    this.rock = null;

    this.colorChosen = [0,0,0];

    this.angTail = 0;
    this.angLFin = 0;
    this.angRFin = 0;

    this.random = Math.random()*6;

    this.initBuffers();
    this.initMaterials();
  }

  initMaterials() {

    if(this.random < 1)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody4.jpg");
    else if(this.random < 2)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody5.jpg");
    else if(this.random < 3)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody6.jpg");
    else if(this.random < 4)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody7.jpg");
    else if(this.random < 5)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody8.jpg");
    else if(this.random < 6)
      this.bodypatern = new CGFtexture(this.scene, "images/fishbody9.jpg");

    this.bodymaterial = new CGFappearance(this.scene);
    this.bodymaterial.setAmbient(0.7,0.7,0.7,1);
    this.bodymaterial.setDiffuse(0.9,0.9,0.9,1);
    this.bodymaterial.setDiffuse(0.2,0.2,0.2,1);
    this.bodymaterial.setShininess(10);
    this.bodymaterial.setTexture(this.bodypatern);
    this.bodymaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.bodymaterial.setColor(this.colorChosen[0],this.colorChosen[1],this.colorChosen[2]);

    this.bodymaterial2 = new CGFappearance(this.scene);
    this.bodymaterial2.setAmbient(0.7,0.7,0.7,1);
    this.bodymaterial2.setDiffuse(0.9,0.9,0.9,1);
    this.bodymaterial2.setDiffuse(0.2,0.2,0.2,1);
    this.bodymaterial2.setShininess(10);
    this.bodymaterial2.setTexture(this.bodypatern);
    this.bodymaterial2.setTextureWrap('REPEAT', 'REPEAT');
    this.bodymaterial2.setColor(this.colorChosen[0],this.colorChosen[1],this.colorChosen[2]);

  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {

    this.triangle = new MyTriangle(this.scene);
    this.fishbody = new MyFishBody(this.scene, 16, 8);
    this.fishtail = new MyFishTail(this.scene);
    this.fishtopfin = new MyFishTopFin(this.scene);
    this.fishfin = new MyFishFin(this.scene);
    this.fisheyeBlack = new MyFishEye(this.scene, 16, 8);
    this.fisheyeWhite = new MyFishEye(this.scene, 16, 8);

  }

  setColorChosen(value){
      this.fishtail.setColor(value);
      this.fishtopfin.setColor(value);
      this.fishfin.setColor(value);
  }

  display(){

    this.scene.pushMatrix();

    this.scene.scale(0.5/1.3,0.5/1.3,0.5/1.3);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,-12.5,0);
    this.scene.pushMatrix();
    this.bodymaterial2.apply();
    this.scene.setActiveShader(this.scene.testShaders[0]);
    this.bodypatern.bind(0);
    this.fishbody.display();
    this.scene.setActiveShader(this.scene.defaultShader);

    if(this.rock != null){
      this.scene.pushMatrix();
      this.scene.translate(0,0,1.4);
      this.scene.scale(this.rock.scale,this.rock.scale,this.rock.scale);
      this.scene.perolmaterial.apply();
      this.rock.display();
      this.scene.popMatrix();
    }
    
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(this.angTail,0,1,0);
    this.fishtail.display();
    this.scene.popMatrix();
    this.fishtopfin.display();

    //right fin
    this.scene.pushMatrix();
    this.scene.translate(-0.25,0,0);
    this.scene.rotate(-Math.PI/5,0,0,1);
    this.scene.rotate(this.angRFin,0,0,1);
    this.fishfin.display();
    this.scene.popMatrix();

    //left fin
    this.scene.pushMatrix();
    this.scene.translate(0.25,0,0);
    this.scene.rotate(-this.angLFin,0,0,1);
    this.scene.rotate(Math.PI/5,0,0,1);
    this.fishfin.display();
    this.scene.popMatrix();

    //right eye
    this.scene.pushMatrix();
    this.scene.translate(0.5,0.5,0.6);
    //this.scene.rotate(Math.PI/5,0,0,1);
    this.scene.scale(0.15,0.15,0.15);
    this.scene.white.apply();
    this.fisheyeBlack.display();
    this.scene.translate(0.2,0.05,0.15);
    this.scene.scale(0.8,0.8,0.8);
    this.scene.black.apply();
    this.fisheyeWhite.display();
    this.scene.popMatrix();

    //left eye
    this.scene.pushMatrix();
    this.scene.translate(-0.5,0.5,0.6);
    //this.scene.rotate(Math.PI/5,0,0,1);
    this.scene.scale(0.15,0.15,0.15);
    this.scene.white.apply();
    this.fisheyeBlack.display();
    this.scene.translate(-0.2,0.05,0.15);
    this.scene.scale(0.8,0.8,0.8);
    this.scene.black.apply();
    this.fisheyeWhite.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

  }

}
