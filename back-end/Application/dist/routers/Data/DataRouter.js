"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = __importDefault(require("../../controllers/Data/data"));
var multer = require('multer');
var storage = multer.diskStorage({ destination: function (req, file, cb) {
        cb(null, '../Data/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "input.csv");
    }
});
var upload = multer({ storage: storage });
var DataRouter = /** @class */ (function () {
    function DataRouter() {
        this.data_router = express_1.Router();
        this.controller = new data_1.default();
        this.configure();
    }
    Object.defineProperty(DataRouter.prototype, "router", {
        get: function () {
            return this.data_router;
        },
        enumerable: false,
        configurable: true
    });
    DataRouter.prototype.configure = function () {
        var _this = this;
        this.data_router.get('/', function (req, res, nex) {
            res.status(200).json({ status: "success" });
        });
        this.data_router.post('/', upload.single('file'), function (req, res, nex) {
            res.status(200).json(_this.controller.process());
        });
    };
    return DataRouter;
}());
exports.default = DataRouter;
