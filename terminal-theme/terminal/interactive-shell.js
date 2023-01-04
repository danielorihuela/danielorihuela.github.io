export const setupTerminalInteraction = (shell) => interact(shell)
    .draggable({
        allowFrom: '#shelltitle',
        listeners: {
            move(event) {
                console.log(event);
                let x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;

                event.target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                event.target.setAttribute('data-x', x);
                event.target.setAttribute('data-y', y);
            },
        }
    })
    .resizable({
        margin: 7,
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
            move: function (event) {
                let { x, y } = event.target.dataset

                x = (parseFloat(x) || 0) + event.deltaRect.left
                y = (parseFloat(y) || 0) + event.deltaRect.top

                if (event.rect.width < 250) {
                    event.rect.width = 250;
                }
                if (event.rect.height < 100) {
                    event.rect.height = 100;
                }

                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                })

                Object.assign(event.target.dataset, { x, y })
            }
        }
    });