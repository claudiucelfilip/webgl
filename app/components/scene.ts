import * as THREE from 'three';

export class Scene extends THREE.Scene {
    constructor()  {
        super();

        this.fog = new THREE.Fog(0x8ad6fa, 300, 500);
        this.name = this.constructor.name;
    }
}