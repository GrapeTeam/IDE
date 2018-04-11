import $ from "jquery";
import "../css/tool.css";

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
    }
}

export default new Tool();