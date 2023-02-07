const WRAPPER = document.getElementById('frame-wrapper');
const CONTENT = document.getElementById('frame-inner');
const SAFEGUARD = document.getElementById('safeguard');



let { _previousX, _previousY, _previousWidth, _previousHeight } = (0, 0, 0, 0);
let { _previousDataX, _previousDataY } = (0, 0);
let _previousTransform = null;



function openFrame(url) {
    _resetFrameWrapperStyle();
    _transformMarginUnitsToPixels();
    _showFrame(url)
}

function _resetFrameWrapperStyle() {
    WRAPPER.style = '';
}

function _transformMarginUnitsToPixels() {
    let { x, y } = WRAPPER.getBoundingClientRect();

    Object.assign(WRAPPER.style, {
        margin: '0',
        marginLeft: `${x}px`,
        marginTop: `${y}px`,
    });
}

function _showFrame(url) {
    CONTENT.setAttribute('src', url);
    WRAPPER.style.setProperty('visibility', 'visible');
}

function minimize() {
    if(!_isFullScreen()) {
        return;
    }

    _restorePreviousBoundingBox();
    _fullScreen = false;
}

function _restorePreviousBoundingBox() {
    Object.assign(WRAPPER.style, {
        marginLeft: _previousX,
        marginTop: _previousY,
        height: _previousHeight,
        width: _previousWidth,
        transform: _previousTransform
    });
    _setDataXFrom(WRAPPER, _previousDataX);
    _setDataYFrom(WRAPPER, _previousDataY);
}

function _setDataXFrom(element, data) {
    element.setAttribute('data-x', data);
}

function _setDataYFrom(element, data) {
    element.setAttribute('data-y', data);
}

function maximize() {
    if(_isFullScreen()) {
        return;
    }

    _storePreviousWrapperBoundingBox();
    _setDataXFrom(WRAPPER, '0');
    _setDataYFrom(WRAPPER, '0');
    _fillScreen();
    _transformMarginUnitsToPixels();
    _fullScreen = true;
}

function _isFullScreen() {
    return WRAPPER.style.height === '100%'
    && WRAPPER.style.width === '100%'
    && WRAPPER.style.transform === 'translate(0px)'
    && WRAPPER.getBoundingClientRect().x === 0
    && WRAPPER.getBoundingClientRect().y === 0;
}

function _fillScreen() {
    Object.assign(WRAPPER.style, {
        margin: 'auto',
        height: '100%',
        width: '100%',
        transform: 'translate(0px, 0px)'
    });
}

function _storePreviousWrapperBoundingBox() {
    _previousX = WRAPPER.style.marginLeft;
    _previousWidth = WRAPPER.style.width;
    _previousY = WRAPPER.style.marginTop;
    _previousHeight = WRAPPER.style.height;
    _previousTransform = WRAPPER.style.transform;
    _previousDataX = _getDataXFrom(WRAPPER);
    _previousDataY = _getDataYFrom(WRAPPER);
}

function closeFrame() {
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
function moveSafeguardToFront() {
    SAFEGUARD.style.setProperty('z-index', '100');
}

document.onmouseup = function () {
    SAFEGUARD.style.setProperty('z-index', '-100');
}



/**
 * Drag and resize frame with https://interactjs.io/
 */
interact('.frame-wrapper')
    .draggable({
        onmove: (event) => {
            let target = event.target;
            let x = _getDataXFrom(target) + event.dx;
            let y = _getDataYFrom(target) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            _setDataXFrom(target, x);
            _setDataYFrom(target, y);
        },
    })
    .resizable({
        ignoreFrom: '.safeguard',
        edges: { left: true, right: true, bottom: true },
        restrictSize: {
            min: { width: 250, height: 200 }
        },
        onmove: (event) => {
            let target = event.target;

            let x = _getDataXFrom(target) + event.deltaRect.left;
            let y = _getDataYFrom(target) + event.deltaRect.top;

            Object.assign(target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`
            });

            _setDataXFrom(target, x);
            _setDataYFrom(target, y);
        }
    });


function _getDataXFrom(element) {
    return parseFloat(element.getAttribute('data-x')) || 0;
}

function _getDataYFrom(element) {
    return parseFloat(element.getAttribute('data-y')) || 0;
}