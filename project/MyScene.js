import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";

import { MySphere } from "./utils/MySphere.js";
import { MyQuad } from "./utils/MyQuad.js";
import { MyCylinder } from "./utils/MyCylinder.js";
import { MyPyramid } from "./utils/MyPyramid.js";

import { MyMovingObject } from "./fish/MyMovingObject.js";
import { MyMovingFish } from "./fish/MyMovingFish.js";

import { MySeaFloor } from "./seafloor/MySeaFloor.js";
import { MyCubeMap } from "./surroundings/MyCubeMap.js";

import { CGFcamera2 } from "./MyCamera.js";
import { MySurface } from "./surroundings/MySurface.js";
import { MySeaElements } from "./surroundings/MySeaElements.js";
import { MySeaScene } from "./surroundings/MySeaScene.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();

        this.selectedExampleShader = 0;

        this.last_t_fish = 0;
        this.last_t_mvobj = 0;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.selectedTexture = 0;
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, new MyPyramid(this,16,8));
        this.fish = new MyMovingFish(this);
        this.quad = new MyQuad(this);
        this.cubemap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this,200);
        this.seafloor = new MySeaFloor(this);
        this.surface = new MySurface(this);
        this.sea_elements = new MySeaElements(this);
        this.sea_scene = new MySeaScene(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMovingObject = false;
        this.displayCubeMap = true;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayFish = true;
        this.displayNormals = false;
        this.displaySeaFloor = true;
        this.displaySeaWeeds = true;
        this.displayRocks = true;
        this.displayAnimatedFish = true;
        this.displayPillars = true;
        this.displaySurface = true;
        this.displaySeaScene = true;
        this.displaySeaElements = true;
        this.displayNest = true;
        this.speedFactor = 1;
        this.scaleFactor = 1;


        //shaders
        this.testShaders = [
			new CGFshader(this.gl, "shaders/fishead.vert", "shaders/fishead.frag"),
            new CGFshader(this.gl, "shaders/sand.vert", "shaders/sand.frag"),
            new CGFshader(this.gl, "shaders/surface.vert", "shaders/surface.frag"),
            new CGFshader(this.gl, "shaders/shell.vert", "shaders/shell.frag"),
            new CGFshader(this.gl, "shaders/seaweed.vert", "shaders/seaweed.frag")
        ]

        this.testShaders[1].setUniformsValues({ uSampler2: 1 });
		this.testShaders[1].setUniformsValues({ USampler: 0 });

        this.testShaders[2].setUniformsValues({ uSampler2: 1 });
		this.testShaders[2].setUniformsValues({ uSampler: 0 });

        this.testShaders[3].setUniformsValues({ uSampler2: 1 });
		this.testShaders[3].setUniformsValues({ uSampler: 0 });

        // Shaders interface variables
		this.shadersList = {
			'Fish': 0,
            'Sand' : 1,
            'Surface' : 2,
            'Shell' : 3,
            'Seaweed' : 4
        }
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }


    onScaleFactorChanged(v) {
		this.testShaders[this.selectedExampleShader].setUniformsValues({ normScale: this.scaleFactor });
	}


    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    updateRed() {
        this.red.setAmbient(...this.hexToRgbA(this.RedValues['Ambient']));
        this.red.setDiffuse(...this.hexToRgbA(this.RedValues['Diffuse']));
        this.red.setSpecular(...this.hexToRgbA(this.RedValues['Specular']));

        this.red.setShininess(this.RedValues['Shininess']);

    }

    updateBlack() {
        this.black.setAmbient(...this.hexToRgbA(this.BlackValues['Ambient']));
        this.black.setDiffuse(...this.hexToRgbA(this.BlackValues['Diffuse']));
        this.black.setSpecular(...this.hexToRgbA(this.BlackValues['Specular']));

        this.black.setShininess(this.BlackValues['Shininess']);

    }

    updateWhite() {
        this.white.setAmbient(...this.hexToRgbA(this.WhiteValues['Ambient']));
        this.white.setDiffuse(...this.hexToRgbA(this.WhiteValues['Diffuse']));
        this.white.setSpecular(...this.hexToRgbA(this.WhiteValues['Specular']));

        this.white.setShininess(this.WhiteValues['Shininess']);

    }
    

    updatePurple() {
        this.purple.setAmbient(...this.hexToRgbA(this.PurpleValues['Ambient']));
        this.purple.setDiffuse(...this.hexToRgbA(this.PurpleValues['Diffuse']));
        this.purple.setSpecular(...this.hexToRgbA(this.PurpleValues['Specular']));

        this.purple.setShininess(this.PurpleValues['Shininess']);

    }

    updateOrange() {
        this.orange.setAmbient(...this.hexToRgbA(this.OrangeValues['Ambient']));
        this.orange.setDiffuse(...this.hexToRgbA(this.OrangeValues['Diffuse']));
        this.orange.setSpecular(...this.hexToRgbA(this.OrangeValues['Specular']));

        this.orange.setShininess(this.OrangeValues['Shininess']);

    }

    updateGreen() {
        this.green.setAmbient(...this.hexToRgbA(this.GreenValues['Ambient']));
        this.green.setDiffuse(...this.hexToRgbA(this.GreenValues['Diffuse']));
        this.green.setSpecular(...this.hexToRgbA(this.GreenValues['Specular']));

        this.green.setShininess(this.GreenValues['Shininess']);

    }

    updateDarkGreen() {
        this.dark_green.setAmbient(...this.hexToRgbA(this.DarkGreenValues['Ambient']));
        this.dark_green.setDiffuse(...this.hexToRgbA(this.DarkGreenValues['Diffuse']));
        this.dark_green.setSpecular(...this.hexToRgbA(this.DarkGreenValues['Specular']));

        this.dark_green.setShininess(this.DarkGreenValues['Shininess']);

    }

    updateLightGreen() {
        this.light_green.setAmbient(...this.hexToRgbA(this.LightGreenValues['Ambient']));
        this.light_green.setDiffuse(...this.hexToRgbA(this.LightGreenValues['Diffuse']));
        this.light_green.setSpecular(...this.hexToRgbA(this.LightGreenValues['Specular']));

        this.light_green.setShininess(this.LightGreenValues['Shininess']);

    }

    initMaterials() {


        this.sandtexture = new CGFappearance(this);
        this.sandtexture.setAmbient(1.0,1.0,1.0,1);
        this.sandtexture.setDiffuse(1.0,1.0,1.0,1);
        this.sandtexture.setDiffuse(1.0,1.0,1.0,1);
        this.sandtexture.setShininess(10);

		this.texture = new CGFtexture(this, "images/sand.png");
		this.sandtexture.setTexture(this.texture);
		this.sandtexture.setTextureWrap('REPEAT', 'REPEAT');

		this.texture2 = new CGFtexture(this, "images/sandMap.png");


        this.shelltexture = new CGFappearance(this);
        this.shelltexture.setAmbient(0.7,0.7,0.7,1);
        this.shelltexture.setDiffuse(0.9,0.9,0.9,1);
        this.shelltexture.setDiffuse(0.2,0.2,0.2,1);
        this.shelltexture.setShininess(10);

		this.color_shell = new CGFtexture(this, "images/shell_trans.png");
		this.shelltexture.setTexture(this.color_shell);
		this.shelltexture.setTextureWrap('REPEAT', 'REPEAT');

		this.black_shell = new CGFtexture(this, "images/blackshell.png");


        this.surfacetexture = new CGFappearance(this);
        this.surfacetexture.setAmbient(0.7,0.7,0.7,1);
        this.surfacetexture.setDiffuse(0.9,0.9,0.9,1);
        this.surfacetexture.setDiffuse(0.2,0.2,0.2,1);
        this.surfacetexture.setShininess(10);

        this.waterpier = new CGFtexture(this, "images/pier.jpg");
		this.surfacetexture.setTexture(this.texture);
		this.surfacetexture.setTextureWrap('REPEAT', 'REPEAT');

		this.distortionmap = new CGFtexture(this, "images/distortionmap.png");


        this.perolTexture = new CGFtexture(this, "images/perol.png");

        this.perolmaterial = new CGFappearance(this);
        this.perolmaterial.setAmbient(1.0,1.0,1.0,1);
        this.perolmaterial.setDiffuse(1.0,1.0,1.0,1);
        this.perolmaterial.setDiffuse(1.0,1.0,1.0,1);
        this.perolmaterial.setShininess(1000);
        this.perolmaterial.setTexture(this.perolTexture);
        this.perolmaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
        this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(1, 1, 1, 1);
		this.sphereAppearance.setShininess(120);

        this.worldTexture = new CGFtexture(this, "images/earth.jpg");

        this.mapWorld = new CGFappearance(this);
		this.mapWorld.setAmbient(0.3, 0.3, 0.3, 1);
		this.mapWorld.setDiffuse(0.7, 0.7, 0.7, 1);
		this.mapWorld.setSpecular(0.0, 0.0, 0.0, 1);
		this.mapWorld.setShininess(120);
        this.mapWorld.setTexture(this.worldTexture);
        this.mapWorld.setTextureWrap('REPEAT', 'REPEAT');

        this.textureIds = { 'UnderWater2': 0, 'Axis': 1, 'UnderWater': 2, 'Nature': 3};

        //red material
        this.red = new CGFappearance(this);

        this.RedValues = {
            'Ambient': '#ff1818',
            'Diffuse': '#ff1818',
            'Specular': '#ff1818',
            'Shininess': 10
        }

        this.updateRed();


        //black material
        this.black = new CGFappearance(this);

        this.BlackValues = {
            'Ambient': '#000000',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateBlack();


        //white material
        this.white = new CGFappearance(this);

        this.WhiteValues = {
            'Ambient': '#ffffff',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateWhite();


        //purple material
        this.purple = new CGFappearance(this);

        this.PurpleValues = {
            'Ambient': '#7B68EE',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 100
        }

        this.updatePurple();


        //orange material
        this.orange = new CGFappearance(this);

        this.OrangeValues = {
            'Ambient': '#FF4500',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateOrange();

        //green material
        this.green = new CGFappearance(this);

        this.GreenValues = {
            'Ambient': '#32CD32',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateGreen();

        
        //dark_green material
        this.dark_green = new CGFappearance(this);

        this.DarkGreenValues = {
            'Ambient': '#008000',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateDarkGreen();

        
        //light_green material
        this.light_green = new CGFappearance(this);

        this.LightGreenValues = {
            'Ambient': '#ADFF2F',
            'Diffuse': '#000000',
            'Specular': '#ffffff',
            'Shininess': 10
        }

        this.updateLightGreen();
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }


    updateTexCoords() {
        this.quad.updateTexCoords(this.texCoords);
        this.tangram.updateTexCoords(this.texCoords);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        if(this.last_t_fish > 0){
            this.fish.update((t-this.last_t_fish)/1000.0);
        }
        this.last_t_fish = t;
        if(this.last_t_mvobj > 0){
            this.movingObject.update((t-this.last_t_mvobj)/1000.0);
        }
        this.last_t_mvobj = t;
      
        // Dividing the time by 100 "slows down" the variation (i.e. in 100 ms timeFactor increases 1 unit).
        // Doing the modulus (%) by 100 makes the timeFactor loop between 0 and 99
        // ( so the loop period of timeFactor is 100 times 100 ms = 10s ; the actual animation loop depends on how timeFactor is used in the shader )
        this.testShaders[1].setUniformsValues({ timeFactor: t / 100 % 100 });
        this.testShaders[2].setUniformsValues({ timeFactor: t / 100 % 100 });
        this.testShaders[4].setUniformsValues({ timeFactor: t / 100 % 100 });
        
        if(this.fish.pos[0] > 4 && this.fish.pos[0] < 8 && this.fish.pos[2] > 4 && this.fish.pos[2] < 8 )
            this.sea_elements.update(Math.PI/18);
        else 
            this.sea_elements.reset();

        if(this.displayAnimatedFish)
            this.sea_elements.update_anim_fish(t);
    }

    updateAppText(){
        this.cubemap.updateAppliedTexture();
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        if(this.gui.isKeyPressed("KeyW")){
            text+= "W ";
            keysPressed = true;
            this.fish.accelerate(0.1);
            this.movingObject.accelerate(0.1);
        }

        if (this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            this.fish.accelerate(-0.1);
            this.movingObject.accelerate(-0.1);
        }

        if (this.gui.isKeyPressed("KeyA")){
            text += "  A ";
            keysPressed = true;
            this.fish.turn(Math.PI/64);
            this.movingObject.turn(Math.PI/64);
        }

        if (this.gui.isKeyPressed("KeyD")){
            text += "   D ";
            keysPressed = true;
            this.fish.turn(-Math.PI/64);
            this.movingObject.turn(-Math.PI/64);
        }

        if (this.gui.isKeyPressed("KeyR")){
            text += "    R ";
            keysPressed = true;
            if(this.fish.obj.rock != null)
                this.sea_elements.rockset.rocks_list.push(this.fish.obj.rock);
            this.fish.reset();
            this.movingObject.reset();
        }

        if (this.gui.isKeyPressed("KeyP")){
            text += "     P ";
            keysPressed = true;
            this.fish.moveUP(0.1);
            this.movingObject.moveUP(0.1);
        }


        if (this.gui.isKeyPressed("KeyL")){
            text += "      L ";
            keysPressed = true;
            this.fish.moveDOWN(0.1);
            this.movingObject.moveDOWN(0.1);
        }

        if (this.gui.isKeyPressed("KeyC")){
            text += "       C ";
            keysPressed = true;
            if(this.fish.pos[1]==3){
                if(this.fish.obj.rock != null)
                    this.checkFishNextNest();
                else if(this.fish.obj.rock == null)
                    this.checkFishNextRock();
            }
            
        }

        if (keysPressed)
            console.log(text);

    }

    checkFishNextRock(){
        for(var i = 0; i < this.sea_elements.rockset.rocks_list.length; i++){
            var distance = Math.sqrt(Math.pow(this.fish.pos[0]-(this.sea_elements.rockset.rocks_list[i].translate_x-25),2)+Math.pow(this.fish.pos[2]-(this.sea_elements.rockset.rocks_list[i].translate_z-25),2));
            if(distance <= 6){
                this.fish.obj.rock = this.sea_elements.rockset.rocks_list[i];
                this.sea_elements.rockset.rocks_list.splice(i,1);
                break;
            }
        }
    }

    checkFishNextNest(){
        console.log(this.fish.pos[0]);
        var distance = Math.sqrt(Math.pow(this.fish.pos[0]-6,2)+Math.pow(this.fish.pos[2]-6,2));
        //console.log(distance);
        if(distance <= 4){
                this.sea_elements.nest.rock_list.push(this.fish.obj.rock);
                this.fish.obj.rock = null;
                console.log(this.fish.obj.rock);
        }
    }


    display() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        //this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        this.translate(-25,0,-25);
        if(this.displayCubeMap){
            this.pushMatrix();
            this.translate(this.camera.position[0],this.camera.position[1],this.camera.position[2]);
            this.scale(500,500,500);
            this.cubemap.display();
            this.popMatrix();
        }
        if(this.displaySphere){
            this.pushMatrix();
            this.mapWorld.apply(); 
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor); 
            this.incompleteSphere.display();
            this.popMatrix();
        }
        if(this.displayCylinder){ 
            this.pushMatrix();
            this.mapWorld.apply(); 
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.cylinder.display();
            this.popMatrix();
        }
        if(this.displayFish){
            this.pushMatrix();
            this.translate(this.fish.pos[0],this.fish.pos[1],this.fish.pos[2]);
            this.fish.display();
            this.popMatrix();
        }
        else if(this.displayMovingObject){
            this.pushMatrix();
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }
        if(this.displaySeaScene){
            this.sea_scene.display();
        }
        if (this.displayNormals){
            this.incompleteSphere.enableNormalViz();
            this.cylinder.enableNormalViz();
        }
        else{
            this.incompleteSphere.disableNormalViz();
            this.cylinder.disableNormalViz();
        }
        this.gl.disable(this.gl.BLEND);
        // ---- END Primitive drawing section
    }
}