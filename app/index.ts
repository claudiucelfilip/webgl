import {
    Scene,
    Globe,
    Camera,
    Country,
    Renderer,
    Loader,
    Mouse,
    Info,
    Tween,
    Mill
} from './components';
import * as THREE from 'three';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/throttleTime';

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
    private domEvents;
    private lights: any = {};

    public rendering: boolean = false;

    constructor(element) {
        this.width = element.clientWidth;
        this.height = element.clientHeight;

        Loader.load()
            .then(() => {
                this.createScene();
                this.createCamera();
                this.createItems();
                this.createRenderer();
                this.createLights();
                this.createInfo();

                element.appendChild(this.renderer.domElement);

                this.render();

                window['scene'] = this.getScene();

                this.setCountryHover();
            });
    }
    private setCountryHover() {
        let raycaster = new THREE.Raycaster();
        let active = {
            name: ''
        };
        let resetCountries = (intersects) => {
            
            this.items.globe.children[0].children
            .filter(item => {
                if (!Country.currentActive) {
                    return true;
                }
                if (item === Country.currentActive.object) {
                    console.log(item, Country.currentActive.object);
                }
                return item !== Country.currentActive.object;
            })
            .forEach(item => {
                item.userData.country.deactivate();
            });
        }
       
        Mouse.position
            .throttleTime(100)
            .subscribe(mousePos => {
                raycaster.setFromCamera(mousePos, this.camera);
                var intersects = raycaster.intersectObjects([this.items.globe], true);
                intersects = intersects.filter((item) => {
                    return item.object.name.match('globe_Z_');
                })
                

                intersects.slice(0,1).forEach((item) => {
                    active = item.object;
                    console.log(item);
                    Info.setPos(item.point.x, item.point.y);
                    item.object.userData.country.activate();
                });
                resetCountries(intersects);
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

    private createInfo() {
        Info.init('Hello');
    }
    private createCamera() {
        let aspectRatio = this.width / this.height;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 1000;

        this.camera = new Camera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        this.setCameraPosition(0, 100, 0);
    }

    private createLights() {
        this.lights.hemisphereLight = new THREE.AmbientLight(0x8ad6fa, 0.2);
        this.lights.hemisphereLight.name = 'Hemi Light';
        this.lights.hemisphereLight.castShadow = false;

        this.lights.shadowLight = new THREE.DirectionalLight(0xffffff, .8);
        this.lights.shadowLight.name = 'Shadow Light';

        this.lights.shadowLight.position.set(0, 350, 950);
        this.lights.shadowLight.castShadow = true;
        

        this.lights.shadowLight.shadow.camera.left = -400;
        this.lights.shadowLight.shadow.camera.right = 400;
        this.lights.shadowLight.shadow.camera.top = 400;
        this.lights.shadowLight.shadow.camera.bottom = -400;
        this.lights.shadowLight.shadow.camera.near = 1;
        this.lights.shadowLight.shadow.camera.far = 1000;

        this.lights.shadowLight.shadowMapWidth = 2048
        this.lights.shadowLight.shadowMapHeight =  2048;
        this.lights.shadowLight.shadowCameraNear = 1;
        this.lights.shadowLight.shadowCameraFar = 100;

        this.lights.shadowLight.shadow.mapSize.width = 2048;
        this.lights.shadowLight.shadow.mapSize.height = 2048;

        this.scene.add(this.lights.hemisphereLight);
        this.scene.add(this.lights.shadowLight);
    }

    public setCameraPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    private createItems() {
        // this.items.mill = new Mill();
        this.items.globe = new Globe();
        // this.scene.add(this.items.mill);
        this.scene.add(this.items.globe);
    }

    private createRenderer() {
        this.renderer = new Renderer(this.width, this.height);
    }

    private loop = () => {
        this.rendering = this.rendering || true;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key) && this.items[key].render) {
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