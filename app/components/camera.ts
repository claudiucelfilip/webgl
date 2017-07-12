import * as THREE from 'three';

export class Camera extends THREE.PerspectiveCamera {
    constructor (...args) {
        super(...args);
        this.name = this.constructor.name;
    }
}