import Service from "./common/service";

export default class ImportService extends Service {

    constructor() {
        super("/market/import");
    }

    uploadStocks(files) {
        const formData = new FormData();
        formData.append('file', files[0]);
        return this.post({resource: "/uploadStocks", data: formData})
    }

    uploadSectors(files) {
        const formData = new FormData();
        formData.append('file', files[0]);
        return this.post({resource: "/uploadSectors", data: formData})
    }

    uploadSegmentFII(files) {
        const formData = new FormData();
        formData.append('file', files[0]);
        return this.post({resource: "/uploadSegmentFII", data: formData})
    }

    uploadHistoricalIBOV(files) {
        const formData = new FormData();
        formData.append('file', files[0]);
        return this.post({resource: "/uploadHistoricalIBOV", data: formData})
    }
}
