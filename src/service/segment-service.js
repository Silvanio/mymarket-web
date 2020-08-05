import Service from "./common/service";

export default class SegmentService extends Service {

    constructor() {
        super("/market/segment");
    }
}
