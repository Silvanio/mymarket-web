import Service from "./common/service";

export default class ProductService extends Service {

    constructor() {
        super("/market/product");
    }
}
