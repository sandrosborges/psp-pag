"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: {
        config: {
            user: 'pagarme',
            host: 'localhost',
            database: 'psp',
            password: 'pagarme2019',
            port: 5432,
        }
    },
    apiSecret: process.env.API_SECRET || 'secret'
};
