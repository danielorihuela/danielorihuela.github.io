export function makeDraggable(elementId, fromId, safeguardId) {
  let currentX, currentY = (0, 0);
  let element = document.getElementById(elementId);
  let from = document.getElementById(fromId);
  let safeguard = document.getElementById(safeguardId);
  from.onmousedown = startDrag;
  from.ontouchstart = startDrag;

  function startDrag(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = getClientX(e, "touchstart");
    currentY = getClientY(e, "touchstart");

    safeguard.style.setProperty('z-index', '100');
    document.onmousemove = drag;
    document.ontouchmove = drag;
    document.onmouseup = endDrag;
    document.ontouchend = endDrag;
  }

  function drag(e) {
    e = e || window.event;
    e.preventDefault();

    let eventX = getClientX(e, "touchmove");
    let eventY = getClientY(e, "touchmove");
    let xPosDiff = currentX - eventX;
    let yPosDiff = currentY - eventY;
    currentX = eventX;
    currentY = eventY;

    element.style.marginTop = (element.offsetTop - yPosDiff) + "px";
    element.style.marginLeft = (element.offsetLeft - xPosDiff) + "px";
  }

  function endDrag() {
    safeguard.style.setProperty('z-index', '-100');
    document.onmousemove = null;
    document.ontouchmove = null;
    document.onmouseup = null;
    document.ontouchend = null;
  }
}

function getClientX(e, type) {
  if (e.type === type) {
    return e.touches[0].clientX;
  } else {
    return e.clientX;
  }
}

function getClientY(e, type) {
  if (e.type === type) {
    return e.touches[0].clientY;
  } else {
    return e.clientY;
  }
}