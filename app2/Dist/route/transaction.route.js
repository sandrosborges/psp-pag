"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const transaction_controller_1 = require("../controller/transaction.controller");
const response_handler_1 = require("../common/response.handler");
const validation_middleware_1 = require("../common/validation.middleware");
const transaction_schema_1 = require("../joi.schema/transaction.schema");
class TransactionRouter extends router_1.Router {
    applyRoutes(application, db) {
        const controller = new transaction_controller_1.TransactionController(db);
        //=========================================================================
        // Retorna todas as trnsacoes
        application.get('/transaction', (req, res) => {
            let baseurl = req.originalUrl;
            return response_handler_1.handler.response(res, controller.getTransactions(), baseurl);
        });
        //=========================================================================
        // Retorna uma transacao especifica, pelo ID
        application.get('/transaction/:id', (req, res) => {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(req.params.id)) {
                let baseurl = req.originalUrl.replace(req.params.id, '');
                return response_handler_1.handler.response(res, controller.getTransaction(Number(req.params.id)), baseurl);
            }
            else
                return res.status(400).json({ "error": "Id nao e valido." });
        });
        //=========================================================================
        // Retorna todas as trnsacoes === 
        application.post('/transaction', validation_middleware_1.validationMiddleware(transaction_schema_1.schemas.transaction, 'body'), (req, res) => {
            let baseurl = req.originalUrl;
            return response_handler_1.handler.response(res, controller.createTransaction(req, res), baseurl);
        });
    }
}
exports.transactionRouter = new TransactionRouter();
