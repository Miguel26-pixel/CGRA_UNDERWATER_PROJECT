import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;
    this.scene = scene;
    this.each_angle = 2*Math.PI/this.slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
   initBuffers() {
    const angleDelta = 2 * Math.PI / this.slices;

    this.texCoords = [];
    this.vertices = [];
    this.normals = [];
    for (var it = 0; it <= this.slices; it++) {
        var x = Math.cos(it * angleDelta);
        var z = Math.sin(it * angleDelta);

        this.vertices.push(x, 0, z,
                           x, 1, z);

        this.normals.push(x, 0, z,
                          x, 0, z);

        this.texCoords.push(-it / this.slices, 1,
                            -it / this.slices, 0);
    }

    this.indices = [];
    for (var i = 0, j = 0; i < this.slices; ++i, j += 2) {
        this.indices.push(j + 1, j, j + 2,
                          j + 2, j + 3, j + 1,
                          j + 1, j + 3, j + 2,
                          j + 2, j, j + 1);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
