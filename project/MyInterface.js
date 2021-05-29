import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Axis');
        var f0 = this.gui.addFolder('SeaWorld')
        f0.add(this.scene, 'displayFish').name('Fish');
        f0.add(this.scene, 'displaySeaFloor').name('SeaFloor');
        f0.add(this.scene, 'displaySeaWeeds').name('SeaWeeds');
        f0.add(this.scene, 'displaySeaElements').name('SeaElements');
        f0.add(this.scene, 'displayRocks').name('Rocks');
        f0.add(this.scene, 'displayAnimatedFish').name('AnimatedFish');
        f0.add(this.scene, 'displayPillars').name('Pillars');
        f0.add(this.scene, 'displayNest').name('Nest');
        f0.add(this.scene, 'displaySurface').name('Surface');
        f0.add(this.scene, 'displaySeaScene').name('SeaScene');
        f0.add(this.scene, 'displayCubeMap').name('CubeMap');
        f0.add(this.scene, 'selectedTexture', this.scene.textureIds).onChange(this.scene.updateAppText.bind(this.scene)).name('Texture');
        this.gui.add(this.scene, 'displayMovingObject').name('MovingObject');
        this.gui.add(this.scene, 'displaySphere').name('Sphere');
        this.gui.add(this.scene, 'displayCylinder').name('Cylinder');
        this.gui.add(this.scene, 'displayNormals').name('Normals');

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        //this.gui.add(this.scene, 'selectedExampleShader', this.scene.shadersList).name('Shader examples').onChange(this.scene.onSelectedShaderChanged.bind(this.scene));

        //this.gui.add(this.scene, 'selectedExampleShader', this.scene.shadersList).name('Shader examples').onChange(this.scene.onSelectedShaderChanged.bind(this.scene));

        this.initKeys();

        return true;
    }

    initKeys(){
        this.scene.gui=this;
        this.processKeyboard = function(){};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        if(this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")){
            this.activeKeys[keyCode] = false;
            return true;
        } 
        return this.activeKeys[keyCode] || false;
    }
}