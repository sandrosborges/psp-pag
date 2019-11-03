import {helper} from '../common/helper'
import { Pool } from 'pg'

export class PayableModel {


    private _creditFee:number=0.05
    private _debitFee:number=0.03
    private _db:Pool 

    constructor(db:Pool){
        this._db = db
    }

    getFee (pay_method:string):number
    {
        return (pay_method =='C')?this._creditFee:this._debitFee;
    }

    getPaymentDate = function(pay_method:string):string
    {
        var dtNow:string =  helper.dateFormat(new Date(), "yyyy-mm-dd");
        var dtD30:string =  helper.dateFormat(helper.dateAddDays(new Date(), 30),"yyyy-mm-dd");

        return pay_method == 'C'?dtD30:dtNow;
    }

    getPaymentValue(transactionValue:number, pay_method:string):number
    {
        return transactionValue * (1-this.getFee(pay_method));
    }

    getStatus(pay_method:string):string
    {
        return pay_method =='C'?'W':'P';
    }

    //====================================================================================
    getPayables(): Promise<any> {
        return this._db.query('SELECT * FROM PSP_PAYABLE ORDER BY id ASC')  
    }

    getPayable(id: number): Promise<any> {
        return this._db.query(`SELECT * FROM PSP_PAYABLE where id = ${id} ORDER BY id ASC`) 
    }

    getExtrato(cod_pdv: string): Promise<any> {

       var statement = `
       select (select COALESCE(sum(vl_payment),0) "saldo available"
            from PSP_PAYABLE where  cod_pdv= '${cod_pdv}' 
            and status = 'P') ,

            (select COALESCE(sum(vl_payment),0) "saldo waiting_funds"
            from PSP_PAYABLE where  cod_pdv= '${cod_pdv}' 
            and status = 'W')`

        return this._db.query(statement)

    }

}
