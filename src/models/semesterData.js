const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
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

const SubjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    questionBank: {
        question: { type: String, required: true },
        answer: AnswerSchema,
    },
});

const SemesterSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
    },
    subjectData: SubjectSchema,
});

const semesterData = new mongoose.model('SemesterData', SemesterSchema);

module.exports = semesterData;
