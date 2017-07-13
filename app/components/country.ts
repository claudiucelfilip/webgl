import * as THREE from 'three';
import { Tween } from './tween';
import { Info } from './info';
import { Observable, Subscription } from 'rxjs';

export class Country {
    public name: string;
    public object: THREE.Object3D;
    private activeSub: Subscription;
    private deactiveSub: Subscription;
    private tween: Tween;
    public active: boolean = false;
    static currentActive: Country;
    private initialColor: THREE.Color;
    static activeColor: THREE.Color = new THREE.Color(`rgb(255, 255, 255)`);

    constructor(object: THREE.Object3D) {
        this.name = object.name;
        this.object = object;
        this.tween = new Tween(this.object.scale.x);
        
    }

    activate() {
        if (Country.currentActive === this) {
            return;
        }
        if (this.deactiveSub) {
            this.deactiveSub.unsubscribe();
        }
        Country.currentActive = this;
        this.tween.set(1);
        this.active = true;
        this.initialColor = this.initialColor || this.object['material'].color;
        this.object['material'].color =  Country.activeColor;

        Info.setText(`
            <h2>${this.object.name}</h2>
            <p>Mauris laoreet ligula eu libero aliquet, at dignissim lorem venenatis.
                Curabitur tempor risus vel faucibus porta.
                Proin a nunc egestas, egestas ex eget, porttitor dolor.
                Quisque at lectus cursus, dictum sem nec, elementum ligula.
                Sed finibus erat vitae neque euismod condimentum.
                Nullam maximus nisl id urna ornare, et placerat lacus bibendum.
                Nam nec turpis suscipit est tristique iaculis non quis lectus.
                Ut ac nisi rutrum, aliquet erat eu, cursus mi.
            </p>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Pellentesque a elit eget ex finibus eleifend eget quis elit.</li>
                <li>Fusce ultrices risus quis euismod elementum.</li>
                <li>Aliquam ut neque sed ex blandit pulvinar.</li>
                <li>Quisque pulvinar tellus sed porttitor bibendum.</li>
                <li>Sed ac purus a libero porttitor varius quis vel magna.</li>
                <li>Aliquam porta lacus et mi tristique, ut varius metus consequat.</li>
                <li>Aenean laoreet urna quis arcu egestas, fringilla interdum magna gravida.</li>
                <li>Morbi id ipsum dapibus, rhoncus nisi vitae, consectetur sapien.</li>
            </ul>
                
            `);
        this.activeSub = this.tween.add(0.01).subscribe(value => {
            this.object.scale.set(value, value, value);
        });
    }

    deactivate() {
        if (Country.currentActive === this) {
            return;
        }
        this.active = false;
        
        if (this.initialColor) {
            this.object['material'].color = this.initialColor;
        }
        
        

        if (this.activeSub) {
            this.activeSub.unsubscribe();
        }
        // this.tween.set(1.01);
        this.object.scale.set(1, 1, 1);
    }
}