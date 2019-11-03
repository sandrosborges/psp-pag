"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    //response(res:express.Response, error:any, result:any, errStatus:number=null):void
    response(res, result, basePath) {
        result.then(result => {
            var resultLen = result.rows.length;
            switch (resultLen) {
                case 0:
                    res.status(404).json([]);
                    break;
                case 1:
                    res.status(200).json(this.envelope(result.rows[0], basePath));
                    break;
                default:
                    res.status(200).json(this.envelopeAll(result.rows, basePath));
            }
        }).catch(ex => {
            res.status(500).json(ex.stack);
        });
    }
    envelope(document, basePath) {
        let resource = Object.assign({ _links: {} }, document);
        if (resource.id == undefined)
            resource._links.self = basePath;
        else
            resource._links.self = `${basePath}${resource.id}`;
        return resource;
    }
    envelopeAll(documents, basePath) {
        const resource = {
            _links: {
                self: `${basePath}`
            },
            items: documents
        };
        resource.items.forEach((document, index, array) => {
            array[index] = this.envelope(document, basePath);
        });
        return resource;
    }
}
exports.handler = new ResponseHandler();
