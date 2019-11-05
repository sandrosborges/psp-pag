import * as pg from 'pg'
import {ITransaction}  from '../interface/ITransaction'
import {IPayable}  from '../interface/IPayable'
import {PayableModel} from './payable.model'
 


export class TransactionModel{

    _db:pg.Pool

    /**
     *  Metodo construtor da classe
     *
     * @param db : Objeto conexao de dados (conexao banco postgress)
     */
    constructor(db:any){
        this._db = db
    }

    /**
     * Metodo que faz o mascaramento do cartao, retornando apenas os 4 ultimos digitos
     * que vão ser armazenados no banco de dados
     *
     * @param cardNumber 
     */
    private maskCardNumber(cardNumber:string):string{
        return  cardNumber.substr(12,4)
    }

    /**
     *  Metodo que retorna todas as transações cadastradas no banco
     */
    getTransactions():Promise<pg.QueryResult<any>>
    {
        return this._db.query('SELECT * FROM PSP_TRANSACTION ORDER BY id ASC')       
    }

    /**
     *  Metodo que retorna uma transacao a partir do id
     *
     * @param id - identificador da transação
     *
     */
    getTransaction(id:number):Promise<pg.QueryResult<any>>
    {
        return this._db.query(`SELECT * FROM PSP_TRANSACTION WHERE ID = ${id} ORDER BY id ASC`)       
    }    

    /**
     * Metodo que cria a transação no banco e cria também o pagamento (payable)
     * A operação é transacionada no BD, caso ocorra algum problema ao gerar o 
     * pagamento (payable), ocorre o rollback da transação
     *
     * @param transaction - parametro que representa a transação (interface ITransaction)
     */
    async createTransaction(transaction:ITransaction):Promise<pg.QueryResult<any>>
    {
        const query = {
            text: 'INSERT INTO PSP_TRANSACTION  (vl_tran, ds_tran, pay_method, card_number, card_bearer, card_valid_thru , card_CVV , cod_PDV )  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            values: [transaction.vl_tran, transaction.ds_tran, transaction.pay_method, this.maskCardNumber(transaction.card_number), transaction.card_bearer, transaction.card_valid_thru, transaction.card_cvv, transaction.cod_pdv],
        } 

        try{
            
           // iniciando a transacao no BD 
           await this._db.query('BEGIN')

           // executando o create da transaction
           var result = await this._db.query(query)

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

            // Executando o create do payable
           await this._db.query(query_pay)

            // Realizando o Commit no BD
           await this._db.query('COMMIT')

           return result

        }

        catch(err)
        {
            // Realizando o rollback no BD
           await this._db.query('ROLLBACK')
           return new Promise((resolve, reject) => {
                reject(new Error(err.message))               

           })

        }
    }

}
