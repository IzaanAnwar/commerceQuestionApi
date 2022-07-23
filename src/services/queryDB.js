const semesterData = require('../models/semesterData');

exports.queryDataWithSemester = async (semesterRec) => {
    const result = await semesterData.find({
        semester: { $in: semesterRec },
    });
    return result;
};

exports.queryDataWithSemAndSub = async (semesterRec, subjectRec) => {
    console.log(semesterRec, subjectRec);
    const result = await semesterData.find({
        semester: semesterRec,
        'subjectData.subjectName': subjectRec,
    });

    return result;
};
exports.queryDataWithSubAndQuestion = async (subjectRec, questionRec) => {
    const result = await semesterData.find({
        'subjectData.subjectName': subjectRec,
        'subjectData.questionBank.question': questionRec,
    });
    return result;
};
exports.queryDataWithSubAndAnswer = async (subjectRec, answerRec) => {
    const result = await semesterData.find({
        'subjectData.subjectName': subjectRec,
        'subjectData.questionBank.answer': answerRec,
    });
    return result;
};

exports.queryDataWithSemSubAns = async (semesterRec, subjectRec, answerRec) => {
    const result = await semesterData.find({
        semseter: semesterRec,
        'subjectData.subjectName': subjectRec,
        'subjectData.questionBank.answer': answerRec,
    });
    return result;
};
