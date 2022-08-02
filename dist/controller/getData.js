"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllsubjects = exports.getAnswerOfQuestion = exports.getAllQuestion = void 0;
const queryDB_1 = require("../services/queryDB");
const getAllQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sem = req.params.sem;
    const sub = req.params.sub;
    const allQuestionsOfSub = yield (0, queryDB_1.queryDataWithSemAndSub)(sem, sub);
    if (allQuestionsOfSub.length === 0) {
        res.status(404).json({
            message: 'Data not availbale for the sem or sub!',
        });
        return;
    }
    const solutions = allQuestionsOfSub.map((data) => {
        var _a;
        return (_a = data.subjectData) === null || _a === void 0 ? void 0 : _a.questionBank;
    });
    res.status(200).json({ data: solutions });
});
exports.getAllQuestion = getAllQuestion;
const getAnswerOfQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    const dataRecieved = yield (0, queryDB_1.queryDataWithQuestion)(question);
    if (dataRecieved.length === 0) {
        res.status(404).json({
            message: 'answer not found for this question',
        });
        return;
    }
    const answerRecieved = dataRecieved.map((data) => {
        var _a, _b;
        return (_b = (_a = data.subjectData) === null || _a === void 0 ? void 0 : _a.questionBank) === null || _b === void 0 ? void 0 : _b.filter((questionData) => {
            if (questionData.question === question) {
                return questionData.answer;
            }
        });
    });
    res.status(200).json({ data: answerRecieved });
});
exports.getAnswerOfQuestion = getAnswerOfQuestion;
const getAllsubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semester = req.params.sem;
    const dataRec = yield (0, queryDB_1.queryDataWithSemester)(semester);
    if (dataRec.length === 0) {
        res.status(404).json({ message: 'Invalid Semester!' });
        return;
    }
    const allSubjects = dataRec.map((data) => {
        var _a;
        return (_a = data === null || data === void 0 ? void 0 : data.subjectData) === null || _a === void 0 ? void 0 : _a.subjectName;
    });
    res.status(200).json({ data: allSubjects });
});
exports.getAllsubjects = getAllsubjects;
