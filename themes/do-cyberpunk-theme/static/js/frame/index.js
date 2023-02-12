import { makeDraggable } from "./drag.js";
import { openFrame, minimize, maximize, close } from "./frame.js";
import { makeResizable } from "./resize.js";

window.openFrame = openFrame;
window.minimize = minimize;
window.maximize = maximize;
window.closeFrame = close;

makeDraggable('frame-wrapper', 'head-bar', 'safeguard');
makeResizable('frame-wrapper', 'right-resizer', 'left-resizer', 'bottom-resizer', 'bottom-right-resizer', 'bottom-left-resizer', 'safeguard');