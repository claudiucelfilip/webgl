import { Subject } from 'rxjs';

interface Position {
    x: number;
    y: number;
}
export class Info {
    private static div: any;
    static position: Subject<Position>;

    static init(text: string) {
        Info.position = new Subject<Position>();
        Info.div = document.createElement('div');
        Info.div.innerText = text;
        Info.div.className = 'info-text';
        document.body.appendChild(Info.div);


    }

    static setText(text: string) {
        Info.div.innerHTML = text;
        Info.div.classList.add('active');
    }

    static deactivate() {
        Info.div.classList.remove('active');
    }
    static setPos(x: number, y: number) {
        
        let cx = (x  + 1) / 2 * window.innerWidth;
        let cy = (1 - y) / 2 * window.innerHeight;

        Info.div.style.left = x + window.innerWidth / 2 + 'px';
        Info.div.style.top = window.innerHeight / 2 - y + 'px';
    }
}