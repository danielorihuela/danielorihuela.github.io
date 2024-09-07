import { getClientX, getClientY } from "./utils.js";

const MIN_HEIGHT = 400;
const MIN_WIDTH = 400;

let initialX = 0;
let initialY = 0;
let safeguard = null;
let element = null;

export function makeResizable(elementId, rightResizerId, leftResizerId, bottomResizerId, bottomRightResizerId, bottomLeftResizerId, safeguardId) {
    element = document.getElementById(elementId);
    safeguard = document.getElementById(safeguardId);

    let rightResizer = document.getElementById(rightResizerId);
    setupListeners(rightResizer, resizeRight);

    let leftResizer = document.getElementById(leftResizerId);
    setupListeners(leftResizer, resizeLeft);

    let bottomResizer = document.getElementById(bottomResizerId);
    setupListeners(bottomResizer, resizeBottom);

    let bottomRightResizer = document.getElementById(bottomRightResizerId);
    setupListeners(bottomRightResizer, resizeBottomRight);

    let bottomLeftResizer = document.getElementById(bottomLeftResizerId);
    setupListeners(bottomLeftResizer, resizeBottomLeft);
}

function setupListeners(element, callback) {
    element.onmousedown = (e) => {
        e = e || window.event;
        e.preventDefault();

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = callback;
        document.onmouseup = endResize;
    }
    element.ontouchstart = (e) => {
        e = e || window.event;
        e.preventDefault();

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = callback;
        document.ontouchend = endResize;
    }
}

function resizeRight(e) {
    let newWidth = element.getBoundingClientRect().width + getClientX(e, "touchmove") - initialX;
    if (newWidth >= MIN_WIDTH) {
        element.style.width = `${newWidth}px`;
        initialX = getClientX(e, "touchmove");
    }
}

function resizeLeft(e) {
    let diffX = getClientX(e, "touchmove") - initialX;
    let newWidth = element.getBoundingClientRect().width - diffX;
    if (newWidth >= MIN_WIDTH) {
        element.style.marginLeft = `${parseFloat(element.style.marginLeft) + diffX}px`;
        element.style.width = `${newWidth}px`;
        initialX = getClientX(e, "touchmove");
    }
}

function resizeBottom(e) {
    let newHeight = element.getBoundingClientRect().height + getClientY(e, "touchmove") - initialY;
    if (newHeight >= MIN_HEIGHT) {
        element.style.height = `${newHeight}px`;
        initialY = getClientY(e, "touchmove");
    }
}

function resizeBottomRight(e) {
    resizeBottom(e);
    resizeRight(e);
}

function resizeBottomLeft(e) {
    resizeBottom(e);
    resizeLeft(e);
}

function endResize() {
    document.onmousemove = document.ontouchmove = null;
    safeguard.style.setProperty('z-index', '-100');
}