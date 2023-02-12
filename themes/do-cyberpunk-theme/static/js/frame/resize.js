export function makeResizable(elementId, rightResizerId, leftResizerId, bottomResizerId, bottomRightResizerId, bottomLeftResizerId, safeguardId) {
    let element = document.getElementById(elementId);
    let rightResizer = document.getElementById(rightResizerId);
    let leftResizer = document.getElementById(leftResizerId);
    let bottomResizer = document.getElementById(bottomResizerId);
    let bottomRightResizer = document.getElementById(bottomRightResizerId);
    let bottomLeftResizer = document.getElementById(bottomLeftResizerId);

    let safeguard = document.getElementById(safeguardId);

    let initialX = 0;
    let initialY = 0;
    rightResizer.onmousedown = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = resizeRight;
    }
    rightResizer.ontouchstart = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = resizeRight;
    }
    leftResizer.onmousedown = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = resizeLeft;
    }
    leftResizer.ontouchstart = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = resizeLeft;
    }
    bottomResizer.onmousedown = (e) => {
        e = e || window.event;

        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = resizeBottom;
    }
    bottomResizer.ontouchstart = (e) => {
        e = e || window.event;

        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = resizeBottom;
    }
    bottomRightResizer.onmousedown = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = resizeBottomRight;
    }
    bottomRightResizer.ontouchstart = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = resizeBottomRight;
    }
    bottomLeftResizer.onmousedown = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.onmousemove = resizeBottomLeft;
    }
    bottomLeftResizer.ontouchstart = (e) => {
        e = e || window.event;

        initialX = getClientX(e, "touchstart");
        initialY = getClientY(e, "touchstart");
        safeguard.style.setProperty('z-index', '100');
        document.ontouchmove = resizeBottomLeft;
    }
    document.onmouseup = () => {
        document.onmousemove = null;
        safeguard.style.setProperty('z-index', '-100');
    }
    document.ontouchend = () => {
        document.ontouchmove = null;
        safeguard.style.setProperty('z-index', '-100');
    }

    function resizeRight(e) {
        e.preventDefault();

        let newWidth = element.getBoundingClientRect().width + getClientX(e, "touchmove") - initialX;
        if(newWidth < 400) {
            return;
        }

        element.style.width = `${newWidth}px`;
        initialX = getClientX(e, "touchmove");
    }

    function resizeLeft(e) {
        e.preventDefault();
        
        let diffX = getClientX(e, "touchmove") - initialX;
        let newWidth = element.getBoundingClientRect().width - diffX;
        if(newWidth < 400) {
            return;
        }

        element.style.marginLeft = `${parseFloat(element.style.marginLeft) + diffX}px`;
        element.style.width = `${newWidth}px`;
        initialX = getClientX(e, "touchmove");
    }

    function resizeBottom(e) {
        e.preventDefault();

        let newHeight = element.getBoundingClientRect().height + getClientY(e, "touchmove") - initialY;
        if(newHeight < 400) {
            return;
        }

        element.style.height = `${newHeight}px`;
        initialY = getClientY(e, "touchmove");
    }

    function resizeBottomRight(e) {
        e.preventDefault();

        let newHeight = element.getBoundingClientRect().height + getClientY(e, "touchmove") - initialY;
        if(newHeight >= 400) {
            element.style.height = `${newHeight}px`;
            initialY = getClientY(e, "touchmove");
        }
        
        let newWidth = element.getBoundingClientRect().width + getClientX(e, "touchmove") - initialX;
        if(newWidth >= 400) {
            element.style.width = `${newWidth}px`;
            initialX = getClientX(e, "touchmove");
        }
    }

    function resizeBottomLeft(e) {
        e.preventDefault();

        let newHeight = element.getBoundingClientRect().height + getClientY(e, "touchmove") - initialY;
        if(newHeight >= 400) {
            element.style.height = `${newHeight}px`;
            initialY = getClientY(e, "touchmove");
        }
        
        let diffX = getClientX(e, "touchmove") - initialX;
        let newWidth = element.getBoundingClientRect().width - diffX;
        if(newWidth >= 400) {
            element.style.marginLeft = `${parseFloat(element.style.marginLeft) + diffX}px`;
            element.style.width = `${newWidth}px`;
            initialX = getClientX(e, "touchmove");
        }
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