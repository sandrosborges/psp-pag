export interface ITransaction {
    id:number,
    vl_tran: number,
    ds_tran: string,
    pay_method: string,
    card_number: string,
    card_bearer: string,        
    card_valid_thru: string,
    card_cvv: string,
    cod_pdv: string
}