"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MasterRouter_1 = __importDefault(require("./routers/MasterRouter"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors = require('cors');
dotenv_1.default.config({
    path: '.env'
});
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.router = new MasterRouter_1.default();
    }
    return Server;
}());
var server = new Server();
server.app.use(body_parser_1.default.json());
server.app.use(cors());
server.app.use('/api', server.router.router);
(function (port) {
    if (port === void 0) { port = process.env.PORT || 5000; }
    server.app.listen(port, function () {
        console.log("to vivo na porta ".concat(port));
    });
})();
