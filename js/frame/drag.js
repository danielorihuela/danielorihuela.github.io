import { getClientX, getClientY, getAttributeFloat } from "./utils.js";

let currentX, currentY = (0, 0);

export function makeDraggable(elementId, fromId, safeguardId) {
  let element = document.getElementById(elementId);
  let from = document.getElementById(fromId);
  let safeguard = document.getElementById(safeguardId);
  from.onmousedown = from.ontouchstart = (e) => startDrag(e, element, safeguard);
}

function startDrag(e, element, safeguard) {
  element.style.willChange = 'transform';

  e = e || window.event;
  e.preventDefault();

  currentX = getClientX(e, "touchstart");
  currentY = getClientY(e, "touchstart");

  safeguard.style.setProperty('z-index', '100');
  document.onmousemove = document.ontouchmove = (e) => drag(e, element);
  document.onmouseup = document.ontouchend = () => endDrag(element, safeguard);
}

function drag(e, element) {
  e = e || window.event;

  let eventX = getClientX(e, "touchmove");
  let newX = getAttributeFloat(element, 'data-x') - (currentX - eventX);
  let eventY = getClientY(e, "touchmove");
  let newY = getAttributeFloat(element, 'data-y') - (currentY - eventY);
  element.style.transform = `translate(${newX}px, ${newY}px)`;
  element.setAttribute('data-x', newX);
  currentX = eventX;
  element.setAttribute('data-y', newY);
  currentY = eventY;
}

function endDrag(element, safeguard) {
  safeguard.style.setProperty('z-index', '-100');
  document.onmousemove = document.ontouchmove = null;
  document.onmouseup = document.ontouchend = null;

  element.style.willChange = 'auto';
}