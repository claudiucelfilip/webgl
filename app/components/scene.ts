import * as THREE from 'three';

export class Scene extends THREE.Scene {
    constructor()  {
        super();

        this.fog = new THREE.Fog(0xf7d9aa, 100, 2000);
        this.name = this.constructor.name;
    }
}