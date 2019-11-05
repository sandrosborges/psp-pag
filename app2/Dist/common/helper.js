"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateFormat = require('dateformat');
class Helper {
    /**
     * Metodo que formata uma data para um formato especifico. Ex.: dd-mm-yyyy
     *
     * @param date : Data
     * @param format : formato especificado. ex.: dd-mm-yy,  yyyy-mm-dd
     */
    dateFormat(date, format) {
        return dateFormat(date, format);
    }
    /**
     * Metodo para add. dias a uma data
     *
     * @param date : Data
     * @param days : Numero de dias a ser adicionado
     */
    dateAddDays(date, days) {
        return date.getTime() + days * 86400000;
    }
}
exports.helper = new Helper();
