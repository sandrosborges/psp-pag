"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const transaction_route_1 = require("./route/transaction.route");
const Payable_route_1 = require("./route/Payable.route");
const server = new server_1.Server();
server.bootstrap([transaction_route_1.transactionRouter, Payable_route_1.payableRouter], false).then(server => {
    console.log('Server is listening on:', server.appPort);
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
