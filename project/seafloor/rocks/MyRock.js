import {CGFobject} from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, scale, translate_x, translate_z, rotate) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.scale = scale;
    this.translate_x = translate_x;
    this.translate_z = translate_z;
    this.rotate = rotate;
    this.randomInNest = 40 + Math.random()-0.5;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;
    var coordlat = 0;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var i_point = [];

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      var coordlong = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {

        var random = Math.random();
        var temp = random < 0.5 ? -1 : 1;
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        x += x*(temp*random + 1);
        y += y*(temp*random + 1);
        z += z*(temp*random + 1);
        if (longitude == 0) {
          i_point.push(x,y,z,random);
        }

        if (longitude != this.longDivs)
          this.vertices.push(x, y, z);
        else this.vertices.push(i_point[0],i_point[1],i_point[2]);


        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        
        this.texCoords.push(coordlong,coordlat);

        coordlong += 1/this.longDivs;
      }
      phi += phiInc;

      coordlat += 1/this.latDivs;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
