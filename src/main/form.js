import $ from "jquery";
import touch from "../lib/touch";
import grid from "./grid";
import prop from "./prop";

var config = [
    {
        zh: "基本配置",
        group: [
            {
                name: "基础设置",
                options: [
                    {
                        name: "栅格默认高度",
                        link: "gridHeight",
                        type: "Input",
                        inline: true,
                    }
                ]
            }
        ]
    }
]
/**
 * 画布控制
 * 协调管理各组件和布局
 */
class Form {
    constructor() {
        this.components = [];       //组件实例表
        this.box = $(".canvas");
        this.registerTouchEvent();
        this.registerGrid();
        this.toolConfig = config;
        this.gridHeight = 50;
        prop.init(this);
    };

    registerTouchEvent() {
        touch.addListener(this.box, this.onTouchmove, this.onTouchDrop, this.onTouchOut);
    };

    registerGrid() {
        grid.init({
            wrap: this.box,
            col: 6
        });
    };

    onTouchmove(x, y, com) {
        grid.render(x, y, com);
    };

    onTouchOut(x, y, com) {
        grid.hidden();
    };

    onTouchDrop(x, y, com) {
        grid.done(com);
        com = new com();
        prop.init(com);
    };
}

export default new Form();