function openFrame(url) {
    $('#frame-inner').attr('src', url);
    $('#frame-wrapper').css('visibility', 'visible');
}

function minimize() {
    $('#frame-wrapper').css('width', '50rem');
    $('#frame-wrapper').css('height', '40rem');
}

function maximize() {
    $('#frame-wrapper').css('width', '100%');
    $('#frame-wrapper').css('height', '100%');
}

function collapse() {
    $('#frame-wrapper').css('visibility', 'collapse');
}