"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = require("../model/transaction.model");
class TransactionController {
    /**
     * Construtor da classe
     * @param db : Objeto que representa a conexao com o banco
     */
    constructor(db) {
        this._model = new transaction_model_1.TransactionModel(db);
    }
    /**
     *  Metodo que lista as transacoes a partir do model
     */
    getTransactions() {
        return this._model.getTransactions();
    }
    /**
     * Metodo que retorna uma transacao a partir do id
     * @param id : identificador da transacao
     */
    getTransaction(id) {
        return this._model.getTransaction(id);
    }
    /**
     * Metodo que cria uma transacao no BD
     * @param req : requisição http
     * @param res : response http
     */
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = req.body;
            return yield this._model.createTransaction(transaction);
        });
    }
}
exports.TransactionController = TransactionController;
