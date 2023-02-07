import { setupTerminalInteraction } from './interactive-shell.js';
import { prompt, completion, commands } from './terminal.js';

const template =
`
<div id="shell" class="shell">
    <div class="status-bar">
        <div class="buttons">
            <a href="javascript:;" class="minimize" title="Minimize">
                <i class="fa fa-chevron-down"></i>
            </a>
            <a href="javascript:;" class="enlarge" title="Enlarge">
                <i class="fa fa-chevron-up"></i>
            </a>
            <a href="javascript:;" id="close" class="close" title="Close">
                <i class="fa fa-times"></i>
            </a>
        </div>
        <div id="shelltitle" class="title">user@host: ~</div>
    </div>
    <div class="content"></div>
</div>`;

class Shell extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        setupTerminalInteraction(document.getElementById("shell"));
        window.term = $('.content').terminal(commands, {
            checkArity: false,
            prompt: prompt,
            completion: completion,
            greetings: '',
        });

        document.getElementById("close").addEventListener('click', closeShell);
    }

    disconnectedCallback() {
        document.getElementById("close").removeEventListener('click', closeShell);
    }
}

window.customElements.define('shell-ui', Shell);

// function openShell() {
//     document.getElementById("shell").style.display = "block";
//     term.exec("ls");
//     document.getElementsByClassName('cmd-cursor')[0].className = 'cmd-cursor cmd-blink'
// }

function closeShell() {
    document.getElementById("shell").style.display = "none";
    term.clear();
}