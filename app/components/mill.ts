import * as THREE from 'three';
import { load } from './loader';
import { Mouse } from './mouse';
import * as OBJLoader from 'three-obj-loader';
import * as MTLLoader  from 'three-mtl-loader';
OBJLoader(THREE);

const variables = require('!!sass-variable-loader!../sass/_variables.scss');

function loadMaterial(url) {
    let mtlLoader = new MTLLoader();

    return new Promise((resolve, reject) => {
        mtlLoader.load(url, (materials) => {
            resolve(materials);
        });
    });
}
function loadObject(url) {
    let objLoader = new THREE.OBJLoader();

    return new Promise((resolve, reject) => {
        objLoader.load(url, (materials) => {
            resolve(materials);
        });
    });
}
export class Mill extends THREE.Group {
    @load(loadMaterial('assets/models/low-poly-mill.mtl')) materials;
    @load(loadObject('assets/models/low-poly-mill.obj')) object;

    constructor(...args) {
        super(...args);

        this.materials.preload();
            
        this.object.children.forEach((child, index) => {
            child.material = this.materials.getAsArray()[index];
        });
        this.name = 'Mill';
        
        this.position.set(0, 100, -500);
        this.add(this.object);

        // Mouse.x.subscribe((value) => {
        //     this.rotation.y += 0.0005 * value;    
        // });

        // Mouse.x.subscribe((value) => {
        //     this.rotation.x += 0.0005 * value;
        // });
    }

    render() {
        this.rotation.y -= 0.0001 * Mouse.x.value;
        this.rotation.x -= 0.0005 * Mouse.y.value;
    }
}