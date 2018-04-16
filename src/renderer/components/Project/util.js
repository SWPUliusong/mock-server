import _ from "lodash";

// 格式化schema为json字符串
export function formatSchema(val) {
    val = _.cloneDeep(val);
    Object.keys(val).forEach(key => {
        let obj = val[key];
        let { __type__: type } = obj;
        // 存储子字段结构
        let childObj = {};
        switch (type) {
            case "array":
                val[key] = [obj.len, obj.value[obj.value.length - 1]];
                break;
            case "object":
                Object.keys(val[key]).forEach(childKey => {
                    // 不显示私有属性__type__
                    if (childKey === "__type__") return;
                    childObj[childKey] = obj[childKey][obj[childKey].length - 1];
                });
                val[key] = childObj;
                break;
            case "collection":
                Object.keys(val[key].value).forEach(childKey => {
                    childObj[childKey] =
                        obj.value[childKey][obj.value[childKey].length - 1];
                });
                val[key] = [val[key].len, childObj];
                break;
            default:
                val[key] = obj[obj.length - 1];
        }
    });
    return JSON.stringify(val, null, 4).trim();
}