"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = require("../model/transaction.model");
class TransactionController {
    constructor(db) {
        this._model = new transaction_model_1.TransactionModel(db);
    }
    getTransactions() {
        return this._model.getTransactions();
    }
    getTransaction(id) {
        return this._model.getTransaction(id);
    }
    createTransaction(req, res) {
        const transaction = req.body;
        return this._model.createTransaction(transaction);
    }
}
exports.TransactionController = TransactionController;
