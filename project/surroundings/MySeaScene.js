import {CGFobject} from '../../lib/CGF.js';

import {MySurface} from './MySurface.js';
import { MySeaElements } from './MySeaElements.js';
import { MySeaFloor } from '../seafloor/MySeaFloor.js';

export class MySeaScene extends CGFobject {
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

    this.seafloor = new MySeaFloor(this.scene);
    this.sea_elements = this.scene.sea_elements;
    this.surface = new MySurface(this.scene);

  }

  display(){
    if(this.scene.displaySeaFloor)
        this.displaySand();
    if(this.scene.displaySurface)
        this.displaySurface();
    if(this.scene.displaySeaElements)
        this.displaySeaElements();

  }

  displaySand() {
    this.seafloor.display();
  }

  displaySurface(){
    this.surface.display();
  }

  displaySeaElements(){
    this.sea_elements.display();
  }

}
