import Vue from "vue";
export default class Model {
    constructor() {
    }
    static getInstance() {
        if (Model._instance == null) {
            Model._instance = new Model();
        }
        return Model._instance;
    }
    async getDataServerList() {
        let result = await Vue.$http.get("./mockup_data/serverlist.json");
        console.log("result ", result);
        return result.data;
    }
    async getData1() {
        let result = await Vue.$http.get(".mockup_datat/serverlist.json");
        return result.data.list;
    }
}
//# sourceMappingURL=Model.js.map