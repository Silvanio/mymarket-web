import Service from "./common/service";

export default class BrokerService extends Service {

    constructor() {
        super("/market/broker");
    }
}
