import Service from "./common/service";

export default class SyncService extends Service {

    constructor() {
        super("/market/sync");
    }


    syncHistoricalDataStock() {
        return this.getMethod("/syncHistoricalDataStock");
    }

    syncQuoteStock() {
        return this.getMethod("/syncQuoteStock");
    }

    syncQuoteCrypto() {
        return this.getMethod("/syncQuoteCrypto");
    }

    syncHistoricalIbovespa() {
        return this.getMethod("/syncHistoricalIbovespa");
    }

}
