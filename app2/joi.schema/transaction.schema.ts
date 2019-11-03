import Joi from 'joi';

export const schemas = {
    transaction: {
        
        vl_tran: Joi.number().required(),
        ds_tran: Joi.string().required(),
        pay_method: Joi.string().length(1).regex(/^C|D$/).required(),
        card_number: Joi.string().regex(/^[0-9]{16}$/).required(),
        card_bearer: Joi.string().min(5).max(20).required(),        
        card_valid_thru: Joi.date().required(),
        card_cvv: Joi.string().regex(/^[0-9]{3}$/).required(),
        cod_pdv: Joi.string().alphanum().max(30).required()
    }
};