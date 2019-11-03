"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payable_model_1 = require("../model/payable.model");
class PayableController {
    constructor(db) {
        this._model = new payable_model_1.PayableModel(db);
    }
    getPayables() {
        return this._model.getPayables();
    }
    getPayable(id) {
        return this._model.getPayable(id);
    }
    getExtrato(cod_pdv) {
        return this._model.getExtrato(cod_pdv);
    }
}
exports.PayableController = PayableController;
