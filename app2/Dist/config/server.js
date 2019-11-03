"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const errorMiddleware_1 = __importDefault(require("./errorMiddleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../config/swagger.json"));
const environment_1 = require("../common/environment");
const pg = __importStar(require("pg"));
const Pool = pg.Pool;
class Server {
    constructor() {
    }
    initializeDb(testEnv) {
        return new Promise((resolve, reject) => {
            try {
                let dbConfig = testEnv ? environment_1.environment.db.configTest : environment_1.environment.db.config;
                this.dbConnection = new Pool(dbConfig);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.app = express_1.default();
                // Express middleware
                this.app.use(cors_1.default({
                    optionsSuccessStatus: 200
                }));
                this.app.use(body_parser_1.urlencoded({
                    extended: true
                }));
                this.app.use(body_parser_1.json());
                this.app.listen(this.appPort, () => {
                    resolve(this.app);
                });
                //routes
                for (let route of routers) {
                    route.applyRoutes(this.app, this.dbConnection);
                }
                swagger_json_1.default.host = `localhost:${this.appPort}`;
                this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
                this.app.use(errorMiddleware_1.default);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getApp() {
        return this.app;
    }
    bootstrap(routers = [], testEnv) {
        this.appPort = testEnv ? parseInt(environment_1.environment.server.portTest.toString())
            : parseInt(environment_1.environment.server.port.toString());
        return this.initializeDb(testEnv).then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
