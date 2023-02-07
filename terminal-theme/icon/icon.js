function template() {
    return `
    <div class="icon">
        <img class="icon-image" src="${this.getAttribute("imageSrc")}"/>
        <span class="icon-caption">${this.getAttribute("caption")}</span>
    </div>`;
}

class Icon extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template.bind(this)();
    }
}

window.customElements.define('icon-ui', Icon);