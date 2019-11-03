import * as pg from 'pg'
import {ITransaction}  from '../interface/ITransaction'
import {IPayable}  from '../interface/IPayable'
import {PayableModel} from './payable.model'
import { resolve } from 'url'


export class TransactionModel{

    _db:pg.Pool

    constructor(db:any){
        this._db = db
    }

    private maskCardNumber(cardNumber:string):string{
        return  cardNumber.substr(12,4)
    }

    getTransactions():Promise<pg.QueryResult<any>>
    {
        return this._db.query('SELECT * FROM PSP_TRANSACTION ORDER BY id ASC')       
    }

    getTransaction(id:number):Promise<pg.QueryResult<any>>
    {
        return this._db.query(`SELECT * FROM PSP_TRANSACTION WHERE ID = ${id} ORDER BY id ASC`)       
    }

    createTransaction(transaction:ITransaction):Promise<pg.QueryResult<any>>
    {

        const query = {
            text: 'INSERT INTO PSP_TRANSACTION  (vl_tran, ds_tran, pay_method, card_number, card_bearer, card_valid_thru , card_CVV , cod_PDV )  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            values: [transaction.vl_tran, transaction.ds_tran, transaction.pay_method, this.maskCardNumber(transaction.card_number), transaction.card_bearer, transaction.card_valid_thru, transaction.card_cvv, transaction.cod_pdv],
          } 

        return this._db.query(query).then(async result =>{
  
            const tran:ITransaction = result.rows[0]

            let payVals:IPayable = {} as any

             var payableModel:PayableModel =new PayableModel(null)
           

            payVals.id_psp_transcation = tran.id
            payVals.pay_method = tran.pay_method
            payVals.cod_PDV = tran.cod_pdv
            payVals.status = payableModel.getStatus(tran.pay_method)
            payVals.payment_date=payableModel.getPaymentDate(tran.pay_method)
            payVals.vl_payment = payableModel.getPaymentValue(tran.vl_tran,tran.pay_method)
            payVals.vl_tran_fee = payableModel.getFee(tran.pay_method)
             

            const query_pay = {
                text:'INSERT INTO PSP_PAYABLE (id_psp_transcation, cod_PDV, pay_method, vl_payment, payment_date, status, vl_tran_fee)  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
                values:[payVals.id_psp_transcation, payVals.cod_PDV, payVals.pay_method, payVals.vl_payment, payVals.payment_date,payVals.status, payVals.vl_tran_fee]
            }

            await this._db.query(query_pay)
            return result
        }) 
    }

}
