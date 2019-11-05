import {TransactionModel} from '../model/transaction.model'
import * as express from 'express'
import * as pg from 'pg'
import {ITransaction}  from '../interface/ITransaction'


export class TransactionController  {

    _model:TransactionModel

    /**
     * Construtor da classe
     * @param db : Objeto que representa a conexao com o banco
     */
    constructor(db:pg.Pool) {  
        this._model = new TransactionModel(db)
    }

    /**
     *  Metodo que lista as transacoes a partir do model
     */
    getTransactions():Promise<any>
    {
        return this._model.getTransactions();
    }

    /**
     * Metodo que retorna uma transacao a partir do id
     * @param id : identificador da transacao
     */
    getTransaction(id:number):Promise<any>
    {
        return this._model.getTransaction(id);
    }

    /**
     * Metodo que cria uma transacao no BD
     * @param req : requisição http
     * @param res : response http
     */
    async createTransaction(req:express.Request, res:express.Response):Promise<any>
    {
        const transaction:ITransaction = req.body;         
        return await this._model.createTransaction(transaction);
    }

}
 
