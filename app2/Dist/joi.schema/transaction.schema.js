"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.schemas = {
    transaction: {
        vl_tran: joi_1.default.number().required(),
        ds_tran: joi_1.default.string().required(),
        pay_method: joi_1.default.string().length(1).regex(/^C|D$/).required(),
        card_number: joi_1.default.string().regex(/^[0-9]{16}$/).required(),
        card_bearer: joi_1.default.string().min(5).max(20).required(),
        card_valid_thru: joi_1.default.date().required(),
        card_cvv: joi_1.default.string().regex(/^[0-9]{3}$/).required(),
        cod_pdv: joi_1.default.string().alphanum().max(30).required()
    }
};
