// 参数结构
export class Params {
    // 字段类型
    type = "plain";
    // 字段名
    key = "";
    // 字段值
    value = [];
    // 当字段是array时，指明长度
    len = 10;
    // 字段为对象或集合时的结构
    obj = {};
}

// 子字段类型
export class ChildFeild {
    key = "";
    value = [];
}

// 字段类型
export const Types = {
    plain: "键值对",
    array: "数组",
    object: "对象",
    collection: "集合",
}