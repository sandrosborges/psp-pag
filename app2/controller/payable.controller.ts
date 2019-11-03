import {PayableModel} from '../model/payable.model'
import * as express from 'express'
import * as pg from 'pg'
import {ITransaction}  from '../interface/ITransaction'


export class PayableController  {


    _model:PayableModel

    constructor(db:pg.Pool) {  
        this._model = new PayableModel(db)
    }

    getPayables(): Promise<any> {
        return this._model.getPayables();
    }

    getPayable(id: number): Promise<any> {
        return this._model.getPayable(id);
    }

    getExtrato(cod_pdv: string): Promise<any> {
        return this._model.getExtrato(cod_pdv);
    }


}