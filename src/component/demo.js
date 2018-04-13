import base from "../lib/base-component";
import icon from "../img/icon/button.png";
import $ from "jquery";

class Demo extends base {
    constructor() {
        super();
        this.icon = icon;
        this.col = 3;
    };

    static getDom() {
        return $(`<button class="btn btn-default">${this.name}</button>`);
    };

    static getIcon() {
        return icon;
    };

    static getName() {
        return "按钮";
    };
}

export default Demo;