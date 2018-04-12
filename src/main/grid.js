import "../css/grid.css";
import $ from "jquery";

/**
 * 为Form画布提供栅格布局服务
 */

var wrap = null;
var col = 3;
var activeDom = null;
var activeGrid = null;

class Grid {
    constructor() {

    };

    init(o) {
        wrap = o.wrap;
        col = o.col ? o.col : this.col;
    };

    setCol(v) {
        col = v;
    };

    hidden() {
        wrap.find(".grid-item:not(.active)").remove();
        activeDom = null;
    };

    done() {
        $(activeGrid).addClass("active");
        wrap.find(".grid-item:not(.active)").remove();
        activeDom = null;
    };

    render(x, y, c) {
        if (!activeDom) {
            activeDom = c.getDom();
            col = c.col ? c.col : 3;
        }
        var items = wrap.find(".grid-item:not(.active)").show();
        if (!items.length) {
            this.insertGridItem();
        } else {
            this.reGroupItem(x, y, items);
        }
    };

    reGroupItem(x, y, items) {
        for (var i = 0; i < items.length; i++) {
            if (x > items[i].offsetLeft && x < items[i].offsetLeft + items[i].offsetWidth && y > items[i].offsetTop && y < items[i].offsetTop + items[i].clientHeight) {
                if ($(items[i]).hasClass("active")) {
                    break;
                }
                activeDom.appendTo($(items[i]).find(".item"));
                activeGrid = items[i];
                break;
            }
        }
    };

    insertGridItem() {
        var line = `<div class="line"></div>`;
        var tpl = `<div class="animated fadeIn grid-item col-sm-${col}"><div class="item"></div></div>`;
        var tmp_col = col;
        for (var i = 0; i < 15; i++) {
            let $line = $(line);
            while (tmp_col <= 12) {
                $line.append(tpl);
                tmp_col += col;
            }
            wrap.append($line);
            tmp_col = col;
        }
    };
}

export default new Grid();