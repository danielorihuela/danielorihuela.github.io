export function getClientX(e, type) {
    if (e.type === type) {
        return e.touches[0].clientX;
    } else {
        return e.clientX;
    }
}

export function getClientY(e, type) {
    if (e.type === type) {
        return e.touches[0].clientY;
    } else {
        return e.clientY;
    }
}