let { previousX, previousY, previousWidth, previousHeight } = (0, 0, 0, 0);
let { _previousDataX: previousDataX, _previousDataY: previousDataY } = (0, 0);
let previousTransform = null;


export function openFrame(url, wrapper, content) {
    resetFrameWrapperStyle(wrapper);
    wrapper.setAttribute('data-x', 0);
    wrapper.setAttribute('data-y', 0);
    transformMarginUnitsToPixels(wrapper);
    showFrame(url, wrapper, content)
}

function resetFrameWrapperStyle(wrapper) {
    wrapper.style = '';
}

function transformMarginUnitsToPixels(wrapper) {
    let { x, y } = wrapper.getBoundingClientRect();

    Object.assign(wrapper.style, {
        margin: '0',
        marginLeft: `${x}px`,
        marginTop: `${y}px`,
    });
}

function showFrame(url, wrapper, content) {
    content.setAttribute('src', url);
    wrapper.style.setProperty('visibility', 'visible');
}

export function minimize(wrapper) {
    if(!isFullScreen(wrapper)) {
        return;
    }

    restorePreviousBoundingBox(wrapper);
}

function restorePreviousBoundingBox(wrapper) {
    Object.assign(wrapper.style, {
        marginLeft: previousX,
        marginTop: previousY,
        height: previousHeight,
        width: previousWidth,
        transform: previousTransform
    });
    wrapper.setAttribute('data-x', previousDataX);
    wrapper.setAttribute('data-y', previousDataY);
}

export function maximize(wrapper) {
    if(isFullScreen(wrapper)) {
        return;
    }

    storePreviousWrapperBoundingBox(wrapper);
    wrapper.setAttribute('data-x', 0);
    wrapper.setAttribute('data-y', 0);
    fillScreen(wrapper);
    transformMarginUnitsToPixels(wrapper);
}

function isFullScreen(wrapper) {
    return wrapper.style.height === '100%'
    && wrapper.style.width === '100%'
    && wrapper.getBoundingClientRect().x === 0
    && wrapper.getBoundingClientRect().y === 0;
}

function fillScreen(wrapper) {
    Object.assign(wrapper.style, {
        margin: 'auto',
        height: '100%',
        width: '100%',
        transform: 'translate(0px, 0px)'
    });
}

function storePreviousWrapperBoundingBox(wrapper) {
    previousX = wrapper.style.marginLeft;
    previousWidth = wrapper.style.width;
    previousY = wrapper.style.marginTop;
    previousHeight = wrapper.style.height;
    previousTransform = wrapper.style.transform;
    previousDataX = parseFloat(wrapper.getAttribute('data-x')) || 0;
    previousDataY = parseFloat(wrapper.getAttribute('data-y')) || 0;
}

export function close(wrapper) {
    wrapper.style.setProperty('visibility', 'collapse');
}
