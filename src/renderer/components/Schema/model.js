// 参数结构
export class Params {
    // 字段类型
    type = "plain";
    // 字段名
    key = "";
    // 当字段类型为普通键值对或数组时，代表字段值
    value = [];
    // 当字段是array时，指明长度
    len = 10;
    // 字段为对象或集合时的结构
    obj = {};
}

// 新增子字段时的结构
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

// 返回params需要的各种参数
export function getParams(field) {
    let { key, schemaValue } = field;
    let value, len, obj;
    let { __type__: type, ...otherObj } = schemaValue;
    switch (type) {
        case 'array':
            ({ len, value } = otherObj)
            break
        case 'object':
            obj = otherObj
            break;
        case 'collection':
            ({ len, value: obj } = otherObj)
            break;
        default:
            // 为type提供默认值
            type = 'plain'
            value = schemaValue
    }

    return { key, value, type, len, obj }
}