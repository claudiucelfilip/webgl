import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
    constructor (width, height) {
        super({
            alpha: true,
            antialias: true
        });
        
        this.setSize(width, height);
        this.shadowMap.enabled = true;
        this.shadowMapEnabled = true;
        
    }
}