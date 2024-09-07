import { makeDraggable } from "./drag.js";
import { openFrame, minimize, maximize, close } from "./buttons.js";
import { makeResizable } from "./resize.js";

const WRAPPER = document.getElementById('frame-wrapper');
const CONTENT = document.getElementById('frame-inner');

window.openFrame = (url) => openFrame(url, WRAPPER, CONTENT);
window.minimize = () => minimize(WRAPPER);
window.maximize = () => maximize(WRAPPER);
window.closeFrame = () => close(WRAPPER);

makeDraggable('frame-wrapper',
    'head-bar',
    'safeguard');
makeResizable('frame-wrapper',
    'right-resizer',
    'left-resizer',
    'bottom-resizer',
    'bottom-right-resizer',
    'bottom-left-resizer',
    'safeguard');