import { getClientX, getClientY } from "./utils.js";

export function makeDraggable(elementId, fromId, safeguardId) {
  let currentX, currentY = (0, 0);
  let element = document.getElementById(elementId);
  let from = document.getElementById(fromId);
  let safeguard = document.getElementById(safeguardId);
  from.onmousedown = startDrag;
  from.ontouchstart = startDrag;

  function startDrag(e) {
    element.style.willChange = 'transform';

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

    let dataX = parseFloat(element.getAttribute('data-x')) || 0;
    let dataY = parseFloat(element.getAttribute('data-y')) || 0;
    element.style.transform = `translate(${dataX - xPosDiff}px, ${dataY - yPosDiff}px)`;
    element.setAttribute('data-x', dataX - xPosDiff);
    element.setAttribute('data-y', dataY - yPosDiff);
  }

  function endDrag() {
    safeguard.style.setProperty('z-index', '-100');
    document.onmousemove = null;
    document.ontouchmove = null;
    document.onmouseup = null;
    document.ontouchend = null;

    element.style.willChange = 'auto';
  }
}
