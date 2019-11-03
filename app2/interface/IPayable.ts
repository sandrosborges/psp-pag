export interface IPayable {
    id:number,
    id_psp_transcation: number,
    cod_PDV: string,
    pay_method: string, 
    vl_payment: number,
    payment_date:string,
    status: string,
    vl_tran_fee: number
} 