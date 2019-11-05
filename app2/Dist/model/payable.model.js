"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../common/helper");
class PayableModel {
    /** Construtor da classe */
    constructor(db) {
        this._creditFee = 0.05;
        this._debitFee = 0.03;
        /**
         *  Metodo para obter a data de pagamento a partir da forma de pagamento (pay_method)
         *  pay_method = 'D', pagamento a vista (retorna data atual)
         *  pay_method = 'C', pagamento em 30 dias
         */
        this.getPaymentDate = function (pay_method) {
            var dtNow = helper_1.helper.dateFormat(new Date(), "yyyy-mm-dd");
            var dtD30 = helper_1.helper.dateFormat(helper_1.helper.dateAddDays(new Date(), 30), "yyyy-mm-dd");
            return pay_method == 'C' ? dtD30 : dtNow;
        };
        this._db = db;
    }
    /**
     *  Método para se obter a taxa a partir da forma de pagamento (pay_method)
     */
    getFee(pay_method) {
        return (pay_method == 'C') ? this._creditFee : this._debitFee;
    }
    /**
     *  Metodo para calcular o pagamento a partir do tipo de pagamento (pay_method)
     *  e do valor da transacao (transactionValue)
     *
     * @param transactionValue : Valor da transação
     * @param pay_method : Forma de pagamento (C= credito, D= debito)
     */
    getPaymentValue(transactionValue, pay_method) {
        return transactionValue * (1 - this.getFee(pay_method));
    }
    /**
     *  Metodo para obter o status do pagamento (W=waiting_funds, P=paid)
     *
     * @param pay_method : metodo de pagamento  (C= credito, D= debito)
     */
    getStatus(pay_method) {
        return pay_method == 'C' ? 'W' : 'P';
    }
    /*======================================================================================================*/
    /** Inicio dos métodos de manipulação de dados no BD */
    /*======================================================================================================*/
    /**
    *   Retorna todos os pagamentos (payables)
    */
    getPayables() {
        return this._db.query('SELECT * FROM PSP_PAYABLE ORDER BY id ASC');
    }
    /**
     *  Metodo para retornar um pagamento pelo id
     *
     * @param id - Identificador do pagamento
     */
    getPayable(id) {
        return this._db.query(`SELECT * FROM PSP_PAYABLE where id = ${id} ORDER BY id ASC`);
    }
    /**
     *  Metodo que retorna os saldos "disponivel (available)"  e
     * "aguardando fundos (waiting_funds)" de um PDV (cliente)
     *
     * @param cod_pdv : Codigo do ponto de venda (identificador do cliente)
     */
    getExtrato(cod_pdv) {
        var statement = `
       select (select COALESCE(sum(vl_payment),0) "saldo available"
            from PSP_PAYABLE where   upper(cod_pdv)= '${cod_pdv.toUpperCase()}' 
            and status = 'P') ,

            (select COALESCE(sum(vl_payment),0) "saldo waiting_funds"
            from PSP_PAYABLE where   upper(cod_pdv)= '${cod_pdv.toUpperCase()}' 
            and status = 'W')`;
        return this._db.query(statement);
    }
}
exports.PayableModel = PayableModel;
