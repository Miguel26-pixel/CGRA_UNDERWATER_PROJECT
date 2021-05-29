import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MyQuad } from "../utils/MyQuad.js";


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene = scene;
		this.init();
	}

	init() {


		this.quad = new MyQuad(this.scene);

		this.updateAppliedTexture();

		this.quadMaterial = new CGFappearance(this.scene);
		this.quadMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.quadMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.quadMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.quadMaterial.setEmission(1,1,1,1);
		this.quadMaterial.setShininess(10);
		this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');


	}

	updateAppliedTexture() {
		if(this.scene.selectedTexture == 3){
			this.texture_top = new CGFtexture(this.scene, "images/demo_cubemap/top.png");
			this.texture_front = new CGFtexture(this.scene, "images/demo_cubemap/front.png");
			this.texture_right = new CGFtexture(this.scene, "images/demo_cubemap/right.png");
			this.texture_back = new CGFtexture(this.scene, "images/demo_cubemap/back.png");
			this.texture_left = new CGFtexture(this.scene, "images/demo_cubemap/left.png");
			this.texture_bot = new CGFtexture(this.scene, "images/demo_cubemap/bottom.png");
		}
		else if(this.scene.selectedTexture == 1){
			this.texture_top = new CGFtexture(this.scene, "images/test_cubemap/py.png");
			this.texture_front = new CGFtexture(this.scene, "images/test_cubemap/nz.png");
			this.texture_right = new CGFtexture(this.scene, "images/test_cubemap/px.png");
			this.texture_back = new CGFtexture(this.scene, "images/test_cubemap/pz.png");
			this.texture_left = new CGFtexture(this.scene, "images/test_cubemap/nx.png");
			this.texture_bot = new CGFtexture(this.scene, "images/test_cubemap/ny.png");
		}
		else if(this.scene.selectedTexture == 2){
			this.texture_top = new CGFtexture(this.scene, "images/underwater_cubemap/top.jpg");
			this.texture_front = new CGFtexture(this.scene, "images/underwater_cubemap/front.jpg");
			this.texture_right = new CGFtexture(this.scene, "images/underwater_cubemap/right.jpg");
			this.texture_back = new CGFtexture(this.scene, "images/underwater_cubemap/back.jpg");
			this.texture_left = new CGFtexture(this.scene, "images/underwater_cubemap/left.jpg");
			this.texture_bot = new CGFtexture(this.scene, "images/underwater_cubemap/bottom.jpg");
		}
		else if(this.scene.selectedTexture == 0){
			this.texture_top = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_up.jpg");
			this.texture_front = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_bk.jpg");
			this.texture_right = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_rt.jpg");
			this.texture_back = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_ft.jpg");
			this.texture_left = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_lf.jpg");
			this.texture_bot = new CGFtexture(this.scene, "images/uw_sky/underwater/uw_dn.jpg");
		}
    }

	display() {

		//back
		this.quadMaterial.setTexture(this.texture_front);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.quadMaterial.apply();
		this.quad.display();
		this.scene.popMatrix();

		//front
		this.quadMaterial.setTexture(this.texture_back);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.translate(0,0,-0.5);
		//this.scene.rotate(-Math.PI, 0, 0, 1);
		this.scene.rotate(-Math.PI, 0, 1, 0);
		this.quadMaterial.apply();
		this.quad.display();
		this.scene.popMatrix();

		//bottom
		this.quadMaterial.setTexture(this.texture_bot);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quadMaterial.apply();
		this.quad.display();
		this.scene.popMatrix();

		//top
		this.quadMaterial.setTexture(this.texture_top);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0.5);
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.quadMaterial.apply();
		this.quad.display();
		this.scene.popMatrix();

		//right
		this.quadMaterial.setTexture(this.texture_right);
		this.quadMaterial.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0.5);
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//left
		this.quadMaterial.setTexture(this.texture_left);
		
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0.5);
		this.scene.translate(0,0,-0.5);
		this.scene.rotate( Math.PI / 2, 0, 1, 0); 
		//this.scene.rotate(Math.PI / 2, 0, 0, 1);
		//this.scene.rotate(Math.PI, 1, 0, 0);
		this.quadMaterial.apply();
		this.quad.display();
		this.scene.popMatrix();
	}
}
