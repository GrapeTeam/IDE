import $ from "jquery";
import "../css/prop.css";
import Template from "../lib/tool-tpl";
import deleteIcon from "../img/icon/delete.png";

/**
 * 初始化包含
 * 1.基本配置信息
 * 2.变更事件回调
 * 
 * 配置定义
 * bindComponent: 绑定表单组件实例
 * name: 组件名称
 * items: 表单选项
 * --name: 表单项名称
 * --link: 单向绑定字段
 * --type: 表单类型
 * --inline: 表单布局是否单行
 * --data: 当type为select时用于填充option, 接受参数[Array, function|Array], Array:[{ value: option的value, zh: option的文字 },...]
 * --updateCanvasOnChange: 当值改变后是否重新渲染画布
 * --updateListOnChange: 当值改变后是否更新组建对象列表
 */

var ComponentData = function (v) {
    this.bindComponent = v;
    this.name = "选项数据";
    this.items = [
        {
            name: "选项列表",
            link: "componentData",
            type: "List",
        },
    ];
};

var ListTpl = `<div class="col-sm-12 m-b" id="@index">
            <input type="text" class="list-key form-control input-sm" value="@key" />
            <span class="list-span">:</span>
            <input type="text" class="list-zh form-control input-sm" value="@zh" />
            <div class="delete"><img src="${deleteIcon}" /></div>
        </div>`;

let Prop = function () {
    var box = $(".configbox");
    var toolbox = $(".toolbox .tool-config-box");
    var currentComponent = null;
    var currentConfig = [];

    this.init = function (v) {
        currentComponent = v;
        toolbox.children(".tabbox").html("");
        toolbox.children("ul").html("");
        render();
        return this;
    };

    var initTabEvent = function () {
        box.find(".tabbox .item").unbind("click").click(function () {
            box.find(".tabbox .item").removeClass("cur");
            $(this).addClass("cur");
            box.find("li").hide().removeClass("cur").eq($(this).index()).addClass("cur").show();
        });
    };

    var getListTpl = function (v, key) {
        var rs = "";
        for (var i = 0; i < v[key].length; i++) {
            rs += ListTpl.replace(/@key/g, v[key][i].value).replace(/@zh/g, v[key][i].zh).replace(/@index/g, "list-" + i);
        }
        rs += `<div class="col-sm-12"><button class="w-full btn btn-info addList">新增</button></div>`;
        return rs;
    };

    var getTpl = function (type, c, v) {
        var tpl = Template(type);
        if (!tpl) {
            throw new Error(`未找到[${(v.inline ? "Inline" : "") + type}]配置组件模板,请于tpl.js中确认!!`);
        }
        if (type == "Input") {
            return $(tpl(v));
        }
        if (type == "Number") {
            return $(tpl(v));
        }
        if (type == "List") {
            return $(tpl({
                name: v.name,
                list: getListTpl(c, v.link),
                placeholder: v.placeholder,
            }));
        }
        if (type == "Select") {
            let option = "";
            if (!v.data) {
                throw new Error("配置组件[Select]未配置data数据!!");
            }
            var data = typeof v.data === 'function' ? v.data(currentComponent) : v.data;
            for (var n = 0; n < data.length; n++) {
                option += `<option value="${data[n].value}">${data[n].zh}</option>`;
            }
            return $(tpl({
                name: v.name,
                data: option,
            }));
        }
    };

    var insertGroup = function (v, box) {
        var tab = $(`<div class="tab b-b">
                        <div class="tab-header">
                            <i class="fa fa-caret-right open"></i>${v.name}
                        </div>
                        <div class="tab-content">
                            <form class="form-horizontal">
                            </form>
                        </div>
                    </div>`);
        box.append(tab);
        tab.find(".tab-header").unbind("click").click(function () {
            if ($(this).find("i").hasClass("open")) {
                $(this).next().hide();
                tab.removeClass("b-b");
                $(this).find("i").removeClass("open");
            } else {
                $(this).next().show();
                tab.addClass("b-b");
                $(this).find("i").addClass("open");
            }
        });
        return tab;
    };

    var insertTab = function (v, i) {
        var tab = $(`<div class="item ${i == 0 ? "cur" : ""}" id="component">${v.zh}</div>`);
        var tabItem = $(`<li class="tab ${i == 0 ? "cur" : ""}"></li>`);
        toolbox.find(".tabbox").append(tab);
        toolbox.find("ul").append(tabItem);
        initTabEvent();
        return { tab: tab, tabItem: tabItem };
    };

    var initTabWidth = function () {
        var tabs = toolbox.find(".item");
        tabs.each(function () {
            this.style.width = 100 / tabs.length + "%";
        });
    };

    var insertTpl = function (v, tab) {
        var notValide = "";

        for (var i = 0; i < v.length; i++) {
            if (currentComponent[v[i].link] === undefined) {
                continue;
            }
            notValide = false;
            var t = getTpl(v[i].type ? v[i].type : "Input", currentComponent, v[i]);
            tab.find("form").append(t);
            initBindEvent(t, currentComponent, v[i]);
        }

        if (notValide) {
            tab.remove();
        }
    };

    var render = function () {
        var config = currentComponent.toolConfig;
        for (var i = 0; i < config.length; i++) {
            let wrap = insertTab(config[i], i);
            for (var n = 0; n < config[i].group.length; n++) {
                let tab = insertGroup(config[i].group[n], wrap.tabItem);
                insertTpl(config[i].group[n].options, tab);
            }
        }
        initTabWidth();
    };

    var initListEvent = function (o, v, c) {
        var tigger = function () {
            var tips = $(this).parents(".form-group:first");
            if (typeof v.onConfigChange === 'function') {
                var rs = v.onConfigChange(c.link);
                if (rs !== undefined) {
                    if (rs.error) {
                        tips.find(".tips").addClass("text-danger").removeClass("hide").html(rs.error);
                    }
                    if (rs.warning) {
                        tips.find(".tips").addClass("text-warning").removeClass("hide").html(rs.warning);
                    }
                }
            } else {
                tips.find(".tips").removeClass("text-danger text-warning").addClass("hide");
            }
        };
        o.find("input").unbind("change").change(function () {
            if ($(this).hasClass("list-key")) {
                v[c.link][this.parentNode.id.split("-").pop()].value = $(this).val();
            } else {
                v[c.link][this.parentNode.id.split("-").pop()].zh = $(this).val();
            }
            tigger();
        });
        o.find(".delete").unbind("click").click(function () {
            var idx = this.parentNode.id.split("-").pop();
            v[c.link].splice(idx, 1);
            var n = $(this.parentNode).next();
            $(this.parentNode).remove();
            while (n.length) {
                n[0].id = "list-" + (parseInt(n[0].id.split("-").pop()) - 1);
                n = $(this.parentNode).next();
            }
            tigger();
        });
        o.find(".addList").unbind("click").click(function (e) {
            var obj = { value: "new", zh: "选项" };
            v[c.link].push(obj);
            $(this.parentNode).before(ListTpl.replace(/@key/g, obj.value).replace(/@zh/g, obj.zh).replace(/@index/g, "list-" + (v[c.link].length - 1)));
            initListEvent(o, v, c);
            tigger();
            e.preventDefault();
        });
    };

    var initBindEvent = function (o, v, c) {
        if (c.type === "List") {
            initListEvent(o, v, c);
            return;
        }
        var old = "";
        o.find("select,input,textarea").val(v[c.link]).unbind("change").change(function () {
            v[c.link] = $(this).val();
            var tips = $(this).parents(".form-group:first");
            if (typeof v.onConfigChange === 'function') {
                var rs = v.onConfigChange(c.link, old);
                if (rs !== undefined) {
                    if (rs.error) {
                        tips.find(".tips").addClass("text-danger").removeClass("hide").html(rs.error);
                    }
                    if (rs.warning) {
                        tips.find(".tips").addClass("text-warning").removeClass("hide").html(rs.warning);
                    }
                }
            } else {
                tips.find(".tips").removeClass("text-danger text-warning").addClass("hide");
            }
        });
        o.find("select,input,textarea").unbind("focus").focus(function () {
            old = $(this).val();
        });
    };
};

export default new Prop();