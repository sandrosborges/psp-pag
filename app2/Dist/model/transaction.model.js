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
const payable_model_1 = require("./payable.model");
class TransactionModel {
    constructor(db) {
        this._db = db;
    }
    maskCardNumber(cardNumber) {
        return cardNumber.substr(12, 4);
    }
    getTransactions() {
        return this._db.query('SELECT * FROM PSP_TRANSACTION ORDER BY id ASC');
    }
    getTransaction(id) {
        return this._db.query(`SELECT * FROM PSP_TRANSACTION WHERE ID = ${id} ORDER BY id ASC`);
    }
    createTransaction(transaction) {
        const query = {
            text: 'INSERT INTO PSP_TRANSACTION  (vl_tran, ds_tran, pay_method, card_number, card_bearer, card_valid_thru , card_CVV , cod_PDV )  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            values: [transaction.vl_tran, transaction.ds_tran, transaction.pay_method, this.maskCardNumber(transaction.card_number), transaction.card_bearer, transaction.card_valid_thru, transaction.card_cvv, transaction.cod_pdv],
        };
        return this._db.query(query).then((result) => __awaiter(this, void 0, void 0, function* () {
            const tran = result.rows[0];
            let payVals = {};
            var payableModel = new payable_model_1.PayableModel(null);
            payVals.id_psp_transcation = tran.id;
            payVals.pay_method = tran.pay_method;
            payVals.cod_PDV = tran.cod_pdv;
            payVals.status = payableModel.getStatus(tran.pay_method);
            payVals.payment_date = payableModel.getPaymentDate(tran.pay_method);
            payVals.vl_payment = payableModel.getPaymentValue(tran.vl_tran, tran.pay_method);
            payVals.vl_tran_fee = payableModel.getFee(tran.pay_method);
            const query_pay = {
                text: 'INSERT INTO PSP_PAYABLE (id_psp_transcation, cod_PDV, pay_method, vl_payment, payment_date, status, vl_tran_fee)  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                values: [payVals.id_psp_transcation, payVals.cod_PDV, payVals.pay_method, payVals.vl_payment, payVals.payment_date, payVals.status, payVals.vl_tran_fee]
            };
            yield this._db.query(query_pay);
            return result;
        }));
    }
}
exports.TransactionModel = TransactionModel;
