import semesterData from '../models/semesterData';

const queryDataWithSemester = async (
    semesterRec: string,
): Promise<object[]> => {
    const result = await semesterData.find({
        semester: { $in: semesterRec },
    });
    return result;
};

const queryDataWithSemAndSub = async (
    semesterRec: string,
    subjectRec: string,
): Promise<object[]> => {
    const result = await semesterData.find({
        semester: semesterRec,
        'subjectData.subjectName': subjectRec,
    });

    return result;
};
const queryDataWithQuestion = async (
    questionRec: string,
): Promise<object[]> => {
    const result = await semesterData.find({
        'subjectData.questionBank.question': questionRec,
    });
    return result;
};
const queryDataWithAnswer = async (answerRec: object): Promise<object[]> => {
    const result = await semesterData.find({
        'subjectData.questionBank.answer': answerRec,
    });
    return result;
};

export {
    queryDataWithSemester,
    queryDataWithSemAndSub,
    queryDataWithQuestion,
    queryDataWithAnswer,
};
