$(function () {
    $('#minimize').click(function () {
        $('#frame-wrapper').css('width', '50rem');
        $('#frame-wrapper').css('height', '40rem');
    });
});

$(function () {
    $('#maximize').click(function () {
        $('#frame-wrapper').css('width', '100%');
        $('#frame-wrapper').css('height', '100%');
    });
});

$(function () {
    $('#close').click(function () {
        $('#frame-wrapper').css('visibility', 'collapse');
    });
});
