"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        portTest: process.env.SERVER_PORT || 3001,
    },
    db: {
        config: {
            user: 'postgres',
            host: 'localhost',
            database: 'psp',
            password: 'password',
            port: 5432,
        },
        configTest: {
            user: 'postgres',
            host: 'localhost',
            database: 'psp_test',
            password: 'password',
            port: 5432,
        }
    }
};
