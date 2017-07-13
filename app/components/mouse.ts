import { BehaviorSubject, Subject, Observable } from 'rxjs';
import 'rxjs/add/observable/combineLatest';

export class Mouse {
    static x: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    static y: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    static position: Observable<any> = Observable.combineLatest(Mouse.x, Mouse.y, (x, y) => ({x, y}));
    static pressed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    static hoverTarget: Element;

    static setPos(x: number, y: number) {
        Mouse.x.next(x);
        Mouse.y.next(y);
    }

    static press(pressed: boolean) {
        Mouse.pressed.next(pressed);
    }
}