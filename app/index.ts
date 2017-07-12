import { Scene,
    Globe,
    Camera,
    Renderer,
    Loader,
    Mouse,
    Mill 
} from './components';
import * as THREE from 'three';

const variables = require('!!sass-variable-loader!./sass/_variables.scss');

export class App {
    private scene: Scene;
    private camera: Camera;
    private renderer: Renderer;

    private mouseX: number;
    private mouseY: number;

    private width: number;
    private height: number;
    private items: any = {};
    private lights: any = {};

    public rendering: boolean = false;

    constructor (element) {
        this.width = element.clientWidth;
        this.height = element.clientHeight;
        
        Loader.load()
            .then(() => {
                this.createScene();
                this.createCamera();
                this.createItems();
                this.createRenderer();
                this.createLights();

                element.appendChild(this.renderer.domElement);

                this.render();

                window['scene'] = this.getScene();
            });
    }

    public updateSize(width, height) {
        this.width = width;
        this.height = height;

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        this.camera.updateProjectionMatrix();
    }
    private createScene() {
        this.scene = new Scene();
    }

    private createCamera() {
        let aspectRatio = this.width / this.height;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 10000;
        
        this.camera = new Camera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        this.setCameraPosition(0, 200, 10);
    }

    private createLights() {
        this.lights.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        this.lights.hemisphereLight.name = 'Hemi Light';

        this.lights.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        this.lights.shadowLight.name = 'Shadow Light';

        this.lights.shadowLight.position.set(150, 350, 350);
        this.lights.shadowLight.castShadow = true;

        this.lights.shadowLight.shadow.camera.left = -400;
        this.lights.shadowLight.shadow.camera.right = 400;
        this.lights.shadowLight.shadow.camera.top = 400;
        this.lights.shadowLight.shadow.camera.bottom = -400;
        this.lights.shadowLight.shadow.camera.near = 1;
        this.lights.shadowLight.shadow.camera.far = 1000;

        this.lights.shadowLight.shadow.mapSize.width = 2048;
        this.lights.shadowLight.shadow.mapSize.height = 2048;

        this.scene.add(this.lights.hemisphereLight);
        this.scene.add(this.lights.shadowLight);
    }

    public setCameraPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    private createItems() {
        this.items.mill = new Mill();
        this.scene.add(this.items.mill);
    }
    
    private createRenderer() {
        this.renderer = new Renderer(this.width, this.height);
    }

    private loop = () => {
        this.rendering = this.rendering || true;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key) && this.items[key].render)  {
                this.items[key].render();
            }
        }
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.loop);
    }
    public render() {
        if (this.rendering) {
            console.log('Already rendering');
            return;
        }
        this.loop();
    }

    public getScene() {
        return this.scene;
    }
}