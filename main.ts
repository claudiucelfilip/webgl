// import { App } from './app';
import { App } from './app';
import { Mouse } from './app/components';

require('./app/sass/main');
let mouseX = 0; 
let mouseY = 0;

let app: App;
function init() {
    let element = document.getElementById('container');
    app = new App(element);
}

function onWindowResize() {
    app.updateSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    // mouseX = (event.clientX - window.innerWidth / 2) / 2;
    // mouseY = (event.clientY - window.innerHeight / 2) / 2;
    mouseX = ( event.clientX / window.innerWidth ) * 2 - 1; 
    mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1; 
    Mouse.setPos(mouseX, mouseY);
}

function onDocumentMouseDown() {
    Mouse.press(true);
}
function onDocumentMouseUp() {
    Mouse.press(false);
}
window.addEventListener('load', init, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);