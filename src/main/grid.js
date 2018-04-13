import "../css/grid.css";
import $ from "jquery";

/**
 * 为Form画布提供栅格布局服务
 */

var wrap = null;
var col = 3;
var activeDom = null;
var gridSize = "sm";

var getItemCol = function (o, offset) {
    var className = o.className.split(" ");
    for (var i = 0; i < className.length; i++) {
        if (className[i].indexOf("col") >= 0 && (offset ? className[i].indexOf("offset") >= 0 : className[i].indexOf("offset") < 0)) {
            return parseInt(className[i].split("-").pop(), 10);
        }
    }

    return 0;
};

var getTpl = function (v) {
    switch (v) {
        case "itemTpl":
            return `<div class="animated fadeIn grid-item col-${gridSize}-${col}"><div class="item"></div></div>`;
        case "lineTpl":
            return `<div class="grid-line"></div>`;
        default:
            return "";
    }
};

var replaceOffset = function (v, to, o) {
    v.removeClass(`col-${gridSize}-offset-${o}`);
    if (to) {
        v.addClass(`col-${gridSize}-offset-${to}`);
    }
};

// var removeOffset = function (v) {
//     var o = getItemCol(v[0], true);
//     if (o) {
//         v.removeClass(`col-${gridSize}-offset-${o}`);
//     }
// };

class Grid {
    init(o) {
        wrap = o.wrap;
        col = o.col ? o.col : this.col;
    };

    setCol(v) {
        col = v;
    };

    removeEmpty(done) {
        wrap.find(".grid-line").each(function () {
            var items = $(this).find(".grid-item");
            var i = 0;
            var hasContent = false;
            var emptyCol = 0;

            while (items[i]) {
                if (!$(items[i]).find(".item").html()) {
                    emptyCol += getItemCol(items[i]);
                    $(items[i]).remove();
                } else {
                    if (emptyCol !== 0) {
                        $(items[i]).addClass(`col-${gridSize}-offset-` + emptyCol);
                    }
                    hasContent = true;
                    emptyCol = 0;
                }
                i++;
            };
            if (!hasContent) {
                $(this).remove();
            } else {
                $(this).addClass("hasContent");
            }
        });
    };

    hidden() {
        activeDom.remove();
        this.removeEmpty();
        activeDom = null;
    };

    done() {
        this.removeEmpty();
        activeDom = null;
    };

    render(x, y, c) {
        if (!activeDom) {
            activeDom = c.getDom();
            col = c.col ? c.col : 3;
        }
        var items = wrap.find(".grid-line:not(.hasContent)").show();
        if (!items.length) {
            this.insertExistGridItem();
            this.insertGridItem();
        }
        this.reGroupItem(x, y, wrap.find(".grid-item"));
    };

    reGroupItem(x, y, items) {
        var f = false;
        for (var i = 0; i < items.length; i++) {
            if (x > items[i].offsetLeft && x < items[i].offsetLeft + items[i].offsetWidth && y > items[i].offsetTop && y < items[i].offsetTop + items[i].clientHeight) {
                f = true;
                if ($(items[i]).find(".item").html()) {
                    break;
                }
                activeDom.appendTo($(items[i]).find(".item"));
                break;
            }
        }
        if (!f) {
            activeDom.remove();
        }
    };

    //向已存在内容的line注入网格
    insertExistGridItem() {
        wrap.find(".hasContent").each(function () {
            var items = $(this).find(".grid-item");
            var totalCol = 0;
            var tmpOffset = 0;
            var offset = 0;
            for (var i = 0; i < items.length; i++) {
                //元素自身COL
                let icol = getItemCol(items[i]);
                //元素偏移COL
                offset = tmpOffset = getItemCol(items[i], true);
                //偏移以及空间计算
                if (col <= tmpOffset) {
                    while (col <= tmpOffset) {
                        tmpOffset -= col;
                        $(items[i]).before(getTpl("itemTpl"));
                        totalCol += col;
                    }
                }
                totalCol += tmpOffset + icol;
                replaceOffset($(items[i]), tmpOffset, offset);
            }
            while (totalCol <= 12 - col) {
                totalCol += col;
                $(items[items.length - 1]).after(getTpl("itemTpl"));
            }
        });
    };

    insertGridItem() {
        var tmp_col = col;
        for (var i = 0; i < 15; i++) {
            let $line = $(getTpl("lineTpl"));
            while (tmp_col <= 12) {
                $line.append(getTpl("itemTpl"));
                tmp_col += col;
            }
            wrap.append($line);
            tmp_col = col;
        }
    };
}

export default new Grid();