import Service from "./common/service";

export default class TrackMarketService extends Service {

    constructor() {
        super("/market/track-market");
    }

    listBaseMarketQuotes() {
        return this.getMethod("/listBaseMarketQuotes",true);
    }

    listMyMarketQuotes() {
        return this.post({resource: "/listMyMarketQuotes"});
    }

    saveList(selectedStocks) {
        return this.post({resource: "/saveList", data: selectedStocks});
    }

    removeMyCardStock(codeStock) {
        return this.post({resource: "/removeMyCardStock", data: codeStock});
    }

    highLightsStockUP(pageableUP) {
        return this.post({resource: "/highLightsStockUP", data: pageableUP});

    }

    highLightsStockDOWN(pageableDOWN) {
        return this.post({resource: "/highLightsStockDOWN", data: pageableDOWN});
    }
}
