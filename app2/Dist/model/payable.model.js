"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../common/helper");
class PayableModel {
    constructor(db) {
        this._creditFee = 0.05;
        this._debitFee = 0.03;
        this.getPaymentDate = function (pay_method) {
            var dtNow = helper_1.helper.dateFormat(new Date(), "yyyy-mm-dd");
            var dtD30 = helper_1.helper.dateFormat(helper_1.helper.dateAddDays(new Date(), 30), "yyyy-mm-dd");
            return pay_method == 'C' ? dtD30 : dtNow;
        };
        this._db = db;
    }
    getFee(pay_method) {
        return (pay_method == 'C') ? this._creditFee : this._debitFee;
    }
    getPaymentValue(transactionValue, pay_method) {
        return transactionValue * (1 - this.getFee(pay_method));
    }
    getStatus(pay_method) {
        return pay_method == 'C' ? 'W' : 'P';
    }
    //====================================================================================
    getPayables() {
        return this._db.query('SELECT * FROM PSP_PAYABLE ORDER BY id ASC');
    }
    getPayable(id) {
        return this._db.query(`SELECT * FROM PSP_PAYABLE where id = ${id} ORDER BY id ASC`);
    }
    getExtrato(cod_pdv) {
        var statement = `
       select (select COALESCE(sum(vl_payment),0) "saldo available"
            from PSP_PAYABLE where  cod_pdv= '${cod_pdv}' 
            and status = 'P') ,

            (select COALESCE(sum(vl_payment),0) "saldo waiting_funds"
            from PSP_PAYABLE where  cod_pdv= '${cod_pdv}' 
            and status = 'W')`;
        return this._db.query(statement);
    }
}
exports.PayableModel = PayableModel;
