export class Mouse {
    static x: number;
    static y: number;
    static startX: number;
    static startY: number;
    static pressed: boolean;
    static hoverTarget: Element;

    constructor() {}

    static setPos(x, y) {
        Mouse.x = x;
        Mouse.y = y;
        if (Mouse.pressed) {
            Mouse.startX = Mouse.startX || Mouse.x;
            Mouse.startY = Mouse.startY || Mouse.y;
        } else {
            Mouse.startX = 0;   
            Mouse.startY = 0;
        }
    }

    static press(pressed) {
        Mouse.pressed = pressed;
    }
}