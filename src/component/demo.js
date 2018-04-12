import base from "../lib/base-component";
import icon from "../img/icon/button.png";
import $ from "jquery";

class Demo extends base {
    constructor() {
        super();
        this.icon = icon;
        this.name = "按钮";
        this.col = 5;
    };

    getDom() {
        return $(`<button class="btn btn-default">${this.name}</button>`);
    };
}

export default Demo;