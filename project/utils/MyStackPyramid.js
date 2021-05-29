import {CGFobject} from '../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
 
export class MyStackPyramid extends CGFobject {
    constructor(scene, bottomRadius, height, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.topRadius = 0;
        this.bottomRadius = bottomRadius;
        this.currentHeight = 0;
        this.heightStep = height / stacks
        this.currentAngle = 0;
        this.currentRadius = bottomRadius;
        this.radiusStep = (Math.abs(bottomRadius - this.topRadius) / this.stacks);
        this.angleStep = (2 * Math.PI) / this.slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []

        for (let i = 0; i <= this.stacks; i++) {
            this.currentAngle = 0
            for (let j = 0; j <= this.slices; j++) {

                this.vertices.push(this.currentRadius * Math.cos(this.currentAngle), this.currentRadius * Math.sin(this.currentAngle), this.currentHeight);
                this.normals.push(Math.cos(this.currentAngle), Math.sin(this.currentAngle), 0)
                this.texCoords.push((1 / this.slices) * j, -(1 / this.stacks) * i)

                if (i != this.stacks && j != this.slices) {
                    this.indices.push(j + (this.slices + 1) * i, j + (this.slices + 1) * i + 1, j + (this.slices + 1) * (i + 1) + 1);
                    this.indices.push(j + (this.slices + 1) * (i + 1) + 1, j + (this.slices + 1) * (i + 1), j + (this.slices + 1) * i);
                }

                this.currentAngle += this.angleStep;

            }
            if (this.bottomRadius >= this.topRadius) {
                this.currentRadius -= this.radiusStep;
            } else {
                this.currentRadius += this.radiusStep;
            }

            this.currentHeight += this.heightStep;

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }

    updateTexCoords(s, t) {


    }
}


