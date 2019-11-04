import {TransactionModel} from '../model/transaction.model'
import * as express from 'express'
import * as pg from 'pg'
import {ITransaction}  from '../interface/ITransaction'


export class TransactionController  {

    _model:TransactionModel

    constructor(db:pg.Pool) {  
        this._model = new TransactionModel(db)
    }

    getTransactions():Promise<any>
    {
        return this._model.getTransactions();
    }

    getTransaction(id:number):Promise<any>
    {
        return this._model.getTransaction(id);
    }

    async createTransaction(req:express.Request, res:express.Response):Promise<any>
    {
        const transaction:ITransaction = req.body;         
        return await this._model.createTransaction(transaction);
    }

}
 
