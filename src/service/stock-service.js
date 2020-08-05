import Service from "./common/service";

export default class StockService extends Service {

    constructor() {
        super("/market/stock");
    }
}
