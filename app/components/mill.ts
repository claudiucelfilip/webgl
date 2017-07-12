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
    let mtlLoader = new THREE.OBJLoader();

    return new Promise((resolve, reject) => {
        mtlLoader.load(url, (materials) => {
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
    }

    render() {
        // if (Mouse.pressed) {
            this.rotation.y += 0.005 * Mouse.x;
            this.rotation.x += 0.005 * Mouse.y;
        // }
    }
}