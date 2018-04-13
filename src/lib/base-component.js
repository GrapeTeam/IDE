class Base {
    constructor() {
        this.toolConfig = [
            {
                zh: "基本配置",
                group: [
                    {
                        name: "基础设置",
                        options: [
                            {
                                name: "栅格",
                                link: "col",
                                type: "Select",
                                inline: true,
                                data: function (v) {
                                    var rs = [];
                                    for (var i = 0; i < 6; i++) {
                                        rs.push({ value: i + 1, zh: i + 1 + "格" });
                                    }
                                    return rs;
                                }
                            }
                        ]
                    }
                ]
            },
        ]
    }
}

export default Base;