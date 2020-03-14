export default class PopUpInfo extends HTMLElement {
    constructor() {
        super();

        var shadow = this.attachShadow({ mode: "open" });

        var wrapper = document.createElement("span");
        wrapper.setAttribute("class", "wrapper");
        
        var icon = document.createElement("span");
        icon.setAttribute("class", "icon");
        icon.setAttribute("tabindex", 0);
        
        var info = document.createElement("span");
        info.setAttribute("class", "info");

        var text = this.getAttribute("text");
        info.textContent = text;

        var img = document.createElement("img");
        img.src = this.hasAttribute("img") ? this.getAttribute("img") : "img/default.png";
        icon.appendChild(img);

        wrapper.appendChild(icon);
        wrapper.appendChild(info);

        shadow.appendChild(wrapper);
    }
}
