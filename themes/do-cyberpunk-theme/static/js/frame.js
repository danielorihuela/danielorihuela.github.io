const frameInnerContent = document.getElementById('frame-inner');
const frameWrapper = document.getElementById('frame-wrapper');

function openFrame(url) {
    frameInnerContent.setAttribute('src', url);
    frameWrapper.style.setProperty('visibility', 'visible');
}

function minimize() {
    frameWrapper.style.setProperty('height', '40rem');
    frameWrapper.style.setProperty('width', '50rem');
}

function maximize() {
    frameWrapper.style.setProperty('height', '100%');
    frameWrapper.style.setProperty('width', '100%');
}

function collapse() {
    frameWrapper.style.setProperty('visibility', 'collapse');
}