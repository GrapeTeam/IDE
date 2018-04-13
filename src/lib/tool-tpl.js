var tpl = {
    InlineInput: (v) => {
        return `<div class="form-group">
            <label class="col-sm-4 control-label">${v.name}</label>
            <div class="col-sm-8">
                <input type="text" class="form-control input-sm" placeholder="${v.placeholder}">
            </div>
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
    Input: (v) => {
        return `<div class="form-group">
            <label class="col-sm-12 m-b-xs control-label">${v.name}</label>
            <div class="col-sm-12">
                <input type="text" class="form-control input-sm" placeholder="${v.placeholder}">
            </div>
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
    InlineNumber: (v) => {
        return `<div class="form-group">
            <label class="col-sm-4 control-label">${v.name}</label>
            <div class="col-sm-8">
                <input type="number" class="form-control input-sm" placeholder="${v.placeholder}">
            </div>
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
    Number: (v) => {
        return `<div class="form-group">
            <label class="col-sm-12 m-b-xs control-label">${v.name}</label>
            <div class="col-sm-12">
                <input type="number" class="form-control input-sm" placeholder="${v.placeholder}">
            </div>
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
    InlineSelect: (v) => {
        return `<div class="form-group">
            <label class="col-sm-4 control-label">${v.name}</label>
            <div class="col-sm-8">
                <select class="form-control input-sm">${v.data}</select>
            </div>
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
    Select: (v) => {
        return `<div class="form-group">
            <label class="col-sm-12 m-b-xs control-label">${v.name}</label>
            <div class="col-sm-12">
                <select class="form-control input-sm">${v.data}</select>
            </div>
        </div>`
    },
    List: (v) => {
        return `<div class="form-group">
            <label class="col-sm-12 m-b-xs control-label">${v.name}</label>
            ${v.list}
            <p class="tips hide col-sm-12"></p>
        </div>`
    },
};

var getTemplate = function (name, v) {
    return tpl["Inline" + name];
};

export default getTemplate;