import { BehaviorSubject, Observable } from 'rxjs';

export class Tween {
    private value: number;
    private subscription;
    private callback;
    constructor(initialValue) {
        this.value = initialValue;
    }
 
    add(newValue) {
        return Observable.interval(20)
            .take(10)
            .map((value) => {
                this.value += value / 10 * newValue;
                return this.value;
            });
    }
    set(newValue: number) {
        this.value = newValue;
    }
    to(newValue: number) {
        
        let diff = newValue - this.value;
        console.log(diff);
        if (!diff) {
            return new BehaviorSubject(newValue);
        }

        let obs = Observable.interval(20)
            .take(10)
            .map((value) => {
                this.value += ((value + 1) / 10 * diff);
                
                return this.value;
            });
        return obs;
    }
}