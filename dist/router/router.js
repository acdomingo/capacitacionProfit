"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = __importDefault(require("../controllers/customerController"));
const router = express_1.Router();
router.get('/', customerController_1.default.list);
exports.default = router;
