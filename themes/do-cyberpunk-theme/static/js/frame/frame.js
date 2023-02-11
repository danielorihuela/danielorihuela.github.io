const WRAPPER = document.getElementById('frame-wrapper');
const CONTENT = document.getElementById('frame-inner');


let { previousX, previousY, previousWidth, previousHeight } = (0, 0, 0, 0);
let previousTransform = null;


export function openFrame(url) {
    resetFrameWrapperStyle();
    transformMarginUnitsToPixels();
    showFrame(url)
}

function resetFrameWrapperStyle() {
    WRAPPER.style = '';
}

function transformMarginUnitsToPixels() {
    let { x, y } = WRAPPER.getBoundingClientRect();

    Object.assign(WRAPPER.style, {
        margin: '0',
        marginLeft: `${x}px`,
        marginTop: `${y}px`,
    });
}

function showFrame(url) {
    CONTENT.setAttribute('src', url);
    WRAPPER.style.setProperty('visibility', 'visible');
}

export function minimize() {
    if(!isFullScreen()) {
        return;
    }

    restorePreviousBoundingBox();
    fullScreen = false;
}

function restorePreviousBoundingBox() {
    Object.assign(WRAPPER.style, {
        marginLeft: previousX,
        marginTop: previousY,
        height: previousHeight,
        width: previousWidth,
        transform: previousTransform
    });
}

export function maximize() {
    if(isFullScreen()) {
        return;
    }

    storePreviousWrapperBoundingBox();
    fillScreen();
    transformMarginUnitsToPixels();
    fullScreen = true;
}

function isFullScreen() {
    return WRAPPER.style.height === '100%'
    && WRAPPER.style.width === '100%'
    && WRAPPER.getBoundingClientRect().x === 0
    && WRAPPER.getBoundingClientRect().y === 0;
}

function fillScreen() {
    Object.assign(WRAPPER.style, {
        margin: 'auto',
        height: '100%',
        width: '100%',
    });
}

function storePreviousWrapperBoundingBox() {
    previousX = WRAPPER.style.marginLeft;
    previousWidth = WRAPPER.style.width;
    previousY = WRAPPER.style.marginTop;
    previousHeight = WRAPPER.style.height;
    previousTransform = WRAPPER.style.transform;
}

export function close() {
    WRAPPER.style.setProperty('visibility', 'collapse');
}



/**
 * Those two events are needed to fix a bug.
 * 
 * Bug explanation:
 * When dragging an element, its position gets updated based on
 * the cursor position. If you start dragging an element which
 * contains an iframe inside, and you move the cursor to the iframe,
 * the animation will stop. An iframe has its own navigation
 * context. Therefore, the parent no longer detects that we are
 * dragging the element.
 * 
 * Solution:
 * Put an element in front of the iframe whenever we start
 * dragging it, and send it to the back when we finish.
 */