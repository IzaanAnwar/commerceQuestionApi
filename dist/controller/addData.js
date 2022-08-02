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
exports.postNewQuestionData = void 0;
// import { DocumentDefinition } from 'mongoose';
const semesterData_1 = __importDefault(require("../models/semesterData"));
const queryDB_1 = require("../services/queryDB");
// LOGIC
function postNewQuestionData(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { semester: semesterRecieved, subject, question: questionRecieved, answer: answerRecieved, } = req.body;
        if (!semesterRecieved || !subject || !questionRecieved || !answerRecieved) {
            res.status(404).json({
                message: "Some Value is missing! check if you typed correct key {'question', 'answer', 'subject', 'semester'} or if you have not provided any value",
            });
            return;
        }
        const dataInSemesterInSub = yield (0, queryDB_1.queryDataWithSemAndSub)(semesterRecieved, subject);
        if (dataInSemesterInSub.length === 0) {
            const newQuestionBank = new semesterData_1.default({
                semester: semesterRecieved,
                subjectData: {
                    subjectName: subject,
                    questionBank: [
                        {
                            question: questionRecieved,
                            answer: answerRecieved,
                        },
                    ],
                },
            });
            newQuestionBank.save((error) => {
                if (error) {
                    res.status(404).json({ message: error.message });
                    return;
                }
                else {
                    res.status(201).json({
                        message: 'succesfully added to database!',
                    });
                    return;
                }
            });
        }
        else {
            /** QUERY WITH QUESTION AND IF THE SEM AND SUB MATCH RETURNS DATA EXISTS IF NOT APPEND THE QUESTION */
            const questionsInSemester = yield (0, queryDB_1.queryDataWithQuestion)(questionRecieved);
            for (const semData of questionsInSemester) {
                if ((semData === null || semData === void 0 ? void 0 : semData.semester) === semesterRecieved &&
                    ((_a = semData.subjectData) === null || _a === void 0 ? void 0 : _a.subjectName) === subject) {
                    res.status(400).json({
                        message: 'data already exists',
                    });
                    return;
                }
            }
            const addQuestion = yield semesterData_1.default.updateOne({
                $and: [
                    {
                        semester: semesterRecieved,
                        'subjectData.subjectName': subject,
                    },
                ],
            }, {
                $addToSet: {
                    'subjectData.questionBank': {
                        question: questionRecieved,
                        answer: answerRecieved,
                    },
                },
            });
            if (!addQuestion.acknowledged) {
                res.status(404).json({
                    response: addQuestion.acknowledged,
                    message: 'failed to add to database',
                });
                return;
            }
            res.status(201).json({
                response: addQuestion.acknowledged,
                message: 'succesfully added to database',
            });
            return;
        }
    });
}
exports.postNewQuestionData = postNewQuestionData;
