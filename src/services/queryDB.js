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
exports.queryDataWithQuestion = async (questionRec) => {
    const result = await semesterData.find({
        'subjectData.questionBank.question': questionRec,
    });
    return result;
};
exports.queryDataWithAnswer = async (answerRec) => {
    const result = await semesterData.find({
        'subjectData.questionBank.answer': answerRec,
    });
    return result;
};
