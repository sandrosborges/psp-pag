"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateFormat = require('dateformat');
class Helper {
    dateFormat(date, format) {
        return dateFormat(date, format);
    }
    dateAddDays(date, days) {
        return date.getTime() + days * 86400000;
    }
}
exports.helper = new Helper();
