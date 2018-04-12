import $ from "jquery";
import config from "../config/tool-config"
import touch from "../lib/touch";

/**
 * 组件列表渲染
 * 含组件分组
 * 暂定结构如下:
 * [
 *      {
 *          name:分组名称
 *          components:[
 *              {
 *                  name:组件名称,
 *                  icon:组件图标,
 *              },
 *              ...
 *          ]
 *      },
 *      ...
 * ]
 */

class Tool {
    constructor() {
        this.box = $(".component-box");
        this.render();
    };

    render() {
        for (var i = 0; i < config.length; i++) {
            var wrap = this.renderCategory(config[i]);
            for (var n = 0; n < config[i].components.length; n++) {
                this.renderItem(wrap, new config[i].components[n]());
            }
        }
    };

    renderItem(wrap, com) {
        var item = $(`<div class="item">
                        <div class="icon" style="background:url(${com.icon}) no-repeat center"></div>
                        <div class="name">${com.name}</div>
                    </div>`)
        wrap.append(touch.init(item, com));
    };

    renderCategory(v) {
        var tpl = $(`<div class="component-group">
                        <div class="component-header">
                            <span>${v.name}</span>
                        </div>
                        <div class="component-item">
                        </div>
                    </div>`);
        this.box.append(tpl);
        return tpl.find(".component-item");
    };
}

export default new Tool();