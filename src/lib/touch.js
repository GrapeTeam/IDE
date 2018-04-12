import $ from "jquery";

var Touch = function () {
    var listener = [];
    var sp = [];
    var activeComponent = null;
    var active = false;
    var cloneDom = "";
    this.init = function (v, c) {
        return touchWrap(v, c);
    };

    this.addListener = function (o, mfn, dfn, ofn) {
        listener.push({ target: o, moveCallBack: mfn, dropCallBack: dfn, outCallBack: ofn });
    };

    this.register = function (o, fn) {

    };

    var touchWrap = function (v, c) {
        var o = v[0];
        active = false;
        sp = [];
        o.addEventListener("mousedown", function (e) {
            var _event = e || window.event;
            var target = $(_event.target);
            sp[0] = _event.clientX - target.offset().left;
            sp[1] = _event.clientY - target.offset().top;
            active = true;
            cloneDom = v.find(".icon").clone();
            cloneDom.addClass("clone-item").offset(v.find(".icon").offset());
            $("body").append(cloneDom);
            activeComponent = c;
        });

        return v;
    };

    var checkCallback = function (e, type) {
        var x = e.clientX;
        var y = e.clientY;
        var tx = 0;
        var ty = 0;
        var tw = 0;
        var th = 0;
        var tmp = "";
        for (var i = 0; i < listener.length; i++) {
            tmp = listener[i].target;
            ty = tmp.offset().top;
            tx = tmp.offset().left;
            tw = tx + tmp.width();
            th = ty + tmp.height();
            if (x > tx && x < tw && y > ty && y < th) {
                if (type === "mousemove" && listener[i].moveCallBack && typeof listener[i].moveCallBack === 'function') {
                    listener[i].enter = true;
                    listener[i].moveCallBack.call(e.target, x - tx, y - ty, activeComponent);
                } else if (listener[i].dropCallBack && typeof listener[i].dropCallBack === 'function') {
                    listener[i].enter = false;
                    listener[i].dropCallBack.call(e.target, x - tx, y - ty, activeComponent);
                }
            } else if (listener[i].enter) {
                listener[i].enter = false;
                listener[i].outCallBack();
            }
        }
    };

    this.registerWindowEvent = function () {
        $("body").unbind("mousemove").mousemove((e) => {
            if (active) {
                var _event = e || window.event;
                checkCallback(_event, "mousemove");
                //设置边界  
                var left = _event.clientX - sp[0];
                var top = _event.clientY - sp[1];
                var body = document.documentElement || document.body;
                if (left < 0) {
                    left = 0;
                }
                if (left > body.offsetWidth - cloneDom[0].offsetWidth) {
                    left = body.offsetWidth - cloneDom[0].offsetWidth;
                }
                if (top < 0) {
                    top = 0;
                }
                if (top > (body.offsetHeight - cloneDom[0].offsetHeight)) {
                    top = (body.offsetHeight - cloneDom[0].offsetHeight);
                }

                //设置样式  
                cloneDom.css({ top: top + "px", left: left + "px" });
            }
        });
        $("body").unbind("mouseup").mouseup((e) => {
            if (active) {
                //卸载样式  
                cloneDom[0].style.cursor = '';
                cloneDom.remove();
                checkCallback(e, "mouseup");
            }
            cloneDom = null;
            active = false;
        });
        return this;
    };
};

export default new Touch().registerWindowEvent();