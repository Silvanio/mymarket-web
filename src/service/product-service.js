import Service from "./common/service";

export default class ProductService extends Service {

    constructor() {
        super("/market/product");
    }

    listForHighLightsStock() {
        return this.getMethod("/listForHighLightsStock");
    }
}
