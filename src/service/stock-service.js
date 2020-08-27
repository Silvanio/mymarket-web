import Service from "./common/service";

export default class StockService extends Service {

    constructor() {
        super("/market/stock");
    }

    refreshQuote(code) {
        return this.post({resource: "/refreshQuote", data: code})
    }

    findByCodeStarts(code) {
        return this.post({resource: "/findByCodeStarts", data: code});
    }
}
