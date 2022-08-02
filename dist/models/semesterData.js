"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// SCHEMA
const AnswerSchema = new mongoose_1.default.Schema({
    introduction: {
        type: String,
        required: true,
    },
    features: [String],
    kinds: [String],
    conclusion: {
        type: String,
        required: true,
    },
});
const SubjectSchema = new mongoose_1.default.Schema({
    subjectName: { type: String, required: true },
    questionBank: [
        {
            question: { type: String, required: true },
            answer: AnswerSchema,
        },
    ],
});
const SemesterSchema = new mongoose_1.default.Schema({
    semester: {
        type: String,
        required: true,
    },
    subjectData: SubjectSchema,
});
const semesterData = mongoose_1.default.model('SemesterData', SemesterSchema);
exports.default = semesterData;
