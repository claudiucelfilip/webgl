import * as THREE from 'three';
const variables = require('!!sass-variable-loader!../sass/_variables.scss');

export class Globe extends THREE.Mesh {
    constructor(...args) {
        var geom = new THREE.SphereGeometry(300, 50, 50);
	
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        
        const mat =
            new THREE.MeshLambertMaterial({
                color: 0xCC0000
            });
        
        super(geom, mat);

        this.receiveShadow = true;
        this.name = this.constructor.name;

        this.position.z = -1000;
    }
    render () {
        console.log('Hello World');
    }
}