"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getData_1 = require("../controller/getData");
const addData_1 = require("../controller/addData");
const router = express_1.default.Router();
router.post('/', addData_1.postNewQuestionData);
router.get('/get-sol/:sem/:sub', getData_1.getAllQuestion);
router.get('/get-ans', getData_1.getAnswerOfQuestion);
router.get('/get-sub/:sem', getData_1.getAllsubjects);
exports.default = router;
