import _ from "lodash"

export default class Api {
    url = ""
    method = ""
    schema = {}
    description = ""

    constructor(api) {
        Object.assign(this, _.cloneDeep(api))
    }

    updateSchema({ type, key, value, len, obj }) {
        switch (type) {
            case "plain":
                this.schema[key] = value
                break
            case "array":
                this.schema[key] = { __type__: type, value, len }
                break
            case "object":
                this.schema[key] = Object.assign(obj, { __type__: type })
                break
            case "collection":
                this.schema[key] = { __type__: type, value: obj, len }
                break
            default:
                this.schema[key] = value
        }
    }
}