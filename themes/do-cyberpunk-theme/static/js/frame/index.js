import { makeDraggable } from "./drag.js";
import { openFrame, minimize, maximize, close } from "./frame.js";

makeDraggable('frame-wrapper', 'head-bar', 'safeguard');

window.openFrame = openFrame;
window.minimize = minimize;
window.maximize = maximize;
window.closeFrame = close;