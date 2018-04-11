import $ from "jquery";

/**
 * 初始化包含
 * 1.基本配置信息
 * 2.变更事件回调
 * 
 * prop.init({
 *      config:[{...}],
 *      onChange: function(){}
 * })
 */
class Prop {
    constructor() {
        this.box = $(".configbox");
    }

    /**
     * 属性配置初始化
     */
    init() {

    }

    /**
     * 渲染
     */
    render() {

    }
}

export default new Prop();