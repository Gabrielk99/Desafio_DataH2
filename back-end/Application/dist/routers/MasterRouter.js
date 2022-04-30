"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DataRouter_1 = __importDefault(require("./Data/DataRouter"));
var MasterRouter = /** @class */ (function () {
    function MasterRouter() {
        this.masterRouter = express_1.Router();
        this.dataRouter = new DataRouter_1.default();
        this.configure();
    }
    Object.defineProperty(MasterRouter.prototype, "router", {
        get: function () {
            return this.masterRouter;
        },
        enumerable: false,
        configurable: true
    });
    MasterRouter.prototype.configure = function () {
        this.masterRouter.use('/data', this.dataRouter.router);
    };
    return MasterRouter;
}());
exports.default = MasterRouter;
