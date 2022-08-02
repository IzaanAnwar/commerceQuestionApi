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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDataWithAnswer = exports.queryDataWithQuestion = exports.queryDataWithSemAndSub = exports.queryDataWithSemester = void 0;
const semesterData_1 = __importDefault(require("../models/semesterData"));
const queryDataWithSemester = (semesterRec) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterData_1.default.find({
        semester: { $in: semesterRec },
    }, { _id: false });
    return result;
});
exports.queryDataWithSemester = queryDataWithSemester;
const queryDataWithSemAndSub = (semesterRec, subjectRec) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterData_1.default.find({
        semester: semesterRec,
        'subjectData.subjectName': subjectRec,
    }, { _id: false });
    return result;
});
exports.queryDataWithSemAndSub = queryDataWithSemAndSub;
const queryDataWithQuestion = (questionRec) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterData_1.default.find({
        'subjectData.questionBank.question': questionRec,
    }, { _id: false });
    return result;
});
exports.queryDataWithQuestion = queryDataWithQuestion;
const queryDataWithAnswer = (answerRec) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterData_1.default.find({
        'subjectData.questionBank.answer': answerRec,
    }, { _id: false });
    return result;
});
exports.queryDataWithAnswer = queryDataWithAnswer;
