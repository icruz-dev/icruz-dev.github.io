export default class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.getElementById('template-nav-bar');
        const content = template.content.cloneNode(true);

        this.appendChild(content);
    }
}
