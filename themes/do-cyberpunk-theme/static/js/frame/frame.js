const WRAPPER = document.getElementById('frame-wrapper');
const CONTENT = document.getElementById('frame-inner');


let { previousX, previousY, previousWidth, previousHeight } = (0, 0, 0, 0);
let { _previousDataX: previousDataX, _previousDataY: previousDataY } = (0, 0);
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
    WRAPPER.setAttribute('data-x', previousDataX);
    WRAPPER.setAttribute('data-y', previousDataY);
}

export function maximize() {
    if(isFullScreen()) {
        return;
    }

    storePreviousWrapperBoundingBox();
    WRAPPER.setAttribute('data-x', 0);
    WRAPPER.setAttribute('data-y', 0);
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
        transform: 'translate(0px, 0px)'
    });
}

function storePreviousWrapperBoundingBox() {
    previousX = WRAPPER.style.marginLeft;
    previousWidth = WRAPPER.style.width;
    previousY = WRAPPER.style.marginTop;
    previousHeight = WRAPPER.style.height;
    previousTransform = WRAPPER.style.transform;
    previousDataX = parseFloat(WRAPPER.getAttribute('data-x')) || 0;
    previousDataY = parseFloat(WRAPPER.getAttribute('data-y')) || 0;
}

export function close() {
    WRAPPER.style.setProperty('visibility', 'collapse');
}
