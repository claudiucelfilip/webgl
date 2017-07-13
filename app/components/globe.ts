import * as THREE from 'three';
import { load } from './loader';
import { Mouse } from './mouse';
import { Country } from './country';
import * as OBJLoader from 'three-obj-loader';
import * as MTLLoader  from 'three-mtl-loader';

OBJLoader(THREE);

const variables = require('!!sass-variable-loader!../sass/_variables.scss');

function loadObject(url) {
    let objLoader = new THREE.OBJLoader();

    return new Promise((resolve, reject) => {
        objLoader.load(url, (materials) => {
            resolve(materials);
        });
    });
}
export class Globe extends THREE.Object3D {
    @load(loadObject('assets/models/globe4.obj')) object;

    constructor(...args) {
        super(...args);

        this.name = 'Globe';

        const mat =
            new THREE.MeshLambertMaterial({
                color: 0x4260ab,
                shading: THREE.SmoothShading
            });

        this.object.getChildByName('globe_Globe_Sea').material = mat;
        
        this.object.children.forEach(item => {
            item.userData.country = new Country(item);
            item.geometry.computeFaceNormals();
            item.geometry.computeVertexNormals();
            if (item.name !== 'globe_Globe_Sea') {
                item.material = new THREE.MeshLambertMaterial({
                    color: (new THREE.Color(`rgb(50, ${this.getRandomColor()}, 50)`)).getHex(),
                    shading: THREE.SmoothShading
                });
            }
            item.castShadow = true;
            item.receiveShadow = true;
            
        });

        this.scale.set(0.4, 0.4, 0.4);
        this.position.set(0, 0, -500);
        this.add(this.object);    
        this.object.castShadow = true;
        this.castShadow = true;    
    }
    getRandomColor() {
        return Math.ceil(50 + Math.random() * 235);
    }
    render() {
        this.rotation.y -= 0.01 * Mouse.x.value;
        this.rotation.x += 0.01 * Mouse.y.value;
    }
}