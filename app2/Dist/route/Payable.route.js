"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const payable_controller_1 = require("../controller/payable.controller");
const response_handler_1 = require("../common/response.handler");
class PayableRouter extends router_1.Router {
    applyRoutes(application, db) {
        const controller = new payable_controller_1.PayableController(db);
        //=========================================================================
        // Retorna todas os pagamentos
        application.get('/payable', (req, res) => {
            let baseurl = req.originalUrl;
            return response_handler_1.handler.response(res, controller.getPayables(), baseurl);
        });
        // Retorna um payable
        application.get('/payable/:id', (req, res) => {
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(req.params.id)) {
                let baseurl = req.originalUrl.replace(`/${req.params.id}`, '');
                return response_handler_1.handler.response(res, controller.getPayable(Number(req.params.id)), baseurl);
            }
            else
                return res.status(400).json({ "error": "Id nao e valido." });
        });
        // Retorna o saldo dos payables agrupados por cliente (cod_PDV)
        application.get('/payable/extrato/:cod_pdv', (req, res) => {
            let baseurl = req.originalUrl.replace(`/${req.params.cod_pdv}`, '');
            return response_handler_1.handler.response(res, controller.getExtrato(req.params.cod_pdv), baseurl);
        });
    }
}
exports.payableRouter = new PayableRouter();
