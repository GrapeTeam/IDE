import $ from "jquery";

/**
 * 组件实例列表
 * 使用树状结构渲染
 * 提供组件的选择丶管理
 * 暂定结构如下:
 * [
 *     {
 *         name:组件名称,
 *         id:组件id,
 *         icon:组件图标,
 *         children:[{...}],    子租件
 *     },
 *     ....
 * ]
 */
class Tree {
    constructor() {
        this.box = $(".component-list");
    }

    
}

export default new Tree();