import $ from "jquery";
import "../css/prop.css";
import "../modules/bootstrap/js/bootstrap";
/**
 * 初始化包含
 * 1.基本配置信息
 * 2.变更事件回调
 *
prop.init({
       config:[{
           name:"基础设置",
           config:[
               {"type":"color","id":"id123","readonly":false},
               {"type":"number","id":"id123","readonly":false},
               {"type":"color","id":"id123","readonly":false},
               {"type":"color","id":"id123","readonly":false},
               {"type":"color","id":"id123","readonly":false},
               {"type":"color","id":"id123","readonly":false}
           ]
       },
           {
               name:"页面设置",
               config:[
                   {"type":"color","id":"id123","readonly":false},
                   {"type":"color","id":"id123","readonly":false},
                   {"type":"color","id":"id123","readonly":false},
                   {"type":"color","id":"id123","readonly":false},
                   {"type":"color","id":"id123","readonly":false},
                   {"type":"color","id":"id123","readonly":false}
               ]
           }],
       onChange: function(){}
 })*/
var configs = [
    {
        name:"基础设置",
        config:[
            {"type":"select","id":"id123","readonly":false},
            {"type":"number","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false}
        ]
    },
    {
        name:"页面设置",
        config:[
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false},
            {"type":"color","id":"id123","readonly":false}
        ]
    }
]
class Prop {
    constructor() {
        this.box = $(".configbox");
        this.render(configs);
    }

    /**
     * 属性配置初始化
     */
    init() {

    }
    render(configs){//渲染容器
        for(var i = 0; i < configs.length; i++){
            var wrap = this.renderCategory(configs[i]);//渲染第i个对象
            for(var n = 0; n < configs[i].config.length; n++){//渲染第i个对象下面的配置信息config
                this.renderItem(wrap,configs[i].config);//调用渲染配置信息的函数
            }
        }

    };
    renderCategory(v){//渲染头部 v为第i个对象
        /**拼容器页面的代码基础设置
         * ...基础的基本设置
         */

        var tpl = $(`<div  class=" tab-content col-xs-12 seo">
               <div  class="tab-pane fade in active " id="basis">
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default" >
                        <div class="panel-heading" id="">
                            <h4 class="panel-title nav-item">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseone">
                                    <span class='arrow'></span>
                                    ${v.name}
                                </a>
                            </h4>
                        </div>
                        <div id="collapseone" class="panel-collapse collapse ">
                            <div class="panel-body bascIn" >
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>`);

        tpl.find('.nav-item>a').click(function(){
            $(this).children('.arrow').toggleClass('open');
            $(this).children('.arrow').toggleClass('arrow-transform');

        });

        this.box.append(tpl);
        //返回容器对象
        //return $(str);//$(...)字符串转为jquery对象
        return tpl.find(".bascIn");

    };

    /**
     * 渲染
     */
    renderItem(wrap,com) {//渲染配置信息 wrap为头部，com为渲染的配置信息
        var elem = "";
          for(var i = 0; i < com.length; i++){
              var obj = com[i];
              var type=obj.type;
              var readonly=obj.readonly==true?" readonly":"";//判断readonly是否有效
              switch(type){//判断input属性
                  case "number":
                      elem +=  '<div class="mar-bottom"><p>数字：</p><div><input type="number" value="" id='+obj.id+readonly+'></div></div>';
                      break;
                  case "select":
                      elem +=  '<div class="mar-bottom"><p>选项框：</p><div><select id='+obj.id+'><option>123</option></select></div></div>';
                      break;
                  case "text":
                      elem +=  '<div class="mar-bottom"><p>类型：</p><div><input type="text" id='+obj.id+'></div></div>';
                      break;
                  case "color":
                      elem += '<div class="mar-bottom"><p>颜色：</p><div><input type="color" value="" id='+obj.id+' onchange="changeValue(this)"></div></div>';
                      break;
              };
          }
               //dom转为jquery对象 再用事件代理

            wrap.append(elem);
            elem = "";

        return elem;
    }
}

export default new Prop();