"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payable_model_1 = require("../model/payable.model");
class PayableController {
    /**
     * Metodo construtor da classe
     * @param db: Objeto de conexão com o banco de dados
     */
    constructor(db) {
        this._model = new payable_model_1.PayableModel(db);
    }
    /**
     * Metodo que lista os pagamentos (payables) a partir do model
     */
    getPayables() {
        return this._model.getPayables();
    }
    /**
     * Metodo que retorna um pagamento (payable) a partir do model pelo id
     * @param id : Identificador do pagamento (payable)
     */
    getPayable(id) {
        return this._model.getPayable(id);
    }
    /**
     * Metodo para obter os saldos "available (disponivel)" e "wainting_funds (aguardando fundos)" a partir do model
     * @param cod_pdv
     */
    getExtrato(cod_pdv) {
        return this._model.getExtrato(cod_pdv);
    }
}
exports.PayableController = PayableController;
