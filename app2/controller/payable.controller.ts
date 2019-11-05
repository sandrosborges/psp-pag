import {PayableModel} from '../model/payable.model'
import * as pg from 'pg'


export class PayableController  {


    _model:PayableModel

    /**
     * Metodo construtor da classe
     * @param db: Objeto de conexão com o banco de dados   
     */
    constructor(db:pg.Pool) {  
        this._model = new PayableModel(db)
    }

    /**
     * Metodo que lista os pagamentos (payables) a partir do model
     */
    getPayables(): Promise<any> {
        return this._model.getPayables();
    }

    /**
     * Metodo que retorna um pagamento (payable) a partir do model pelo id
     * @param id : Identificador do pagamento (payable)
     */
    getPayable(id: number): Promise<any> {
        return this._model.getPayable(id);
    }

    /**
     * Metodo para obter os saldos "available (disponivel)" e "wainting_funds (aguardando fundos)" a partir do model
     * @param cod_pdv 
     */
    getExtrato(cod_pdv: string): Promise<any> {
        return this._model.getExtrato(cod_pdv);
    }


}