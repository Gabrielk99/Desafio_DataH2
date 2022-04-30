"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require("child_process").execSync;
var fs = require("fs");
var DataController = /** @class */ (function () {
    function DataController() {
    }
    DataController.prototype.process = function () {
        var script_dir = __dirname.replace('Application/dist/controllers/Data', 'Domain/python-scripts/core');
        var output_dir = __dirname.replace('Application/dist/controllers/Data', 'Data/processed/output.json');
        try {
            exec("python3 main.py", { cwd: script_dir });
            return {
                status: "success",
                message: "the process was success",
                res: JSON.parse(fs.readFileSync(output_dir, 'utf8'))
            };
        }
        catch (err) {
            return {
                status: "error",
                message: "the process fail.",
                res: null
            };
        }
    };
    return DataController;
}());
exports.default = DataController;
