import $ from "jquery";
import "../css/editor.css";
import "../modules/editor/lib/codemirror.css";
import codemirror from "../modules/editor/lib/codemirror.js";
import "../modules/editor/mode/javascript/javascript.js";


/**
 * 初始化包含
 * 1.基本配置信息
 * 2.变更事件回调
 *
 prop.init({
       config:[{

           }],
       onChange: function(){}
 })*/

class editor {
    constructor() {
        // this.render();
    }

    /**
     * 属性配置初始化
     */
    init() {

    }
    render(v,fn){
             var wrap = this.renderCategory() ;
            this.renderItem(wrap)
    }

    renderCategory(elem){//弹框
        var tpl=$(` 
            <div class="Emodal">
        <div class="Emodal-dialog">
            <div class="Emodal-content">
                <!--关闭按钮-->
                <b class="btnClose">&times;</b>
                <!--选择框-->
                <div class="choice">
                    <select class="Eform-control">
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                    <select class="Eform-control">
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                </div>
                <!--代码编辑器-->
                <div class="editor">
                    <textarea id="textarea">

                    </textarea>
                </div>

            </div>
        </div>
    </div>
        `);
        tpl.find('.btnClose').on('click',function(){
            tpl.fadeOut();
        })
        return $('body').append(tpl).find("#textarea");
    }
   renderItem(wrap){//动态生成

        var doc = codemirror.fromTextArea(wrap[0], {
            lineNumbers: true,//是否显示序列数字
            mode: "text/javascript",//类型
            matchBrackets: true,//匹配括号,
            // theme: "dracula",
             lineWrapping: true,//是否强制换行
            // indentUnit: 2,  // 缩进
            // tabSize:4, //制表符的宽度。默认为4。
            // indentWithTabs: boolean  //是否缩进
            // specialChars: RegExp //特殊占位符替换的正则表达式
            //lineWrapping: boolean //是否应滚动或换行较长。默认为false（滚动）。
            // lineNumberFormatter: function(line: integer) → string
            // readOnly: boolean|string  //这会禁止用户编辑编辑器内容
            // showCursorWhenSelecting: boolean //当选择处于活动状态时是否应绘制光标。默认为false。

        });
        //editor.setSize('800px', '950px');     //设置代码框的长宽
        // doc.getValue()    //获取编辑器内容
        // editor.setValue("");    //给代码框赋值
        // editor.getValue();    //获取代码框的值
        // doc.on("blur",function(){   //事件绑定格式！
        //         alert(1);
        // });
        /*doc.on('change',function(a,b,c,d,e){
            console.log(a,b,c,d,e)
        })*/

    }

}

export default new editor();