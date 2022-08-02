import semesterData from '../models/semesterData';

const queryDataWithSemester = async (
    semesterRec: string,
): Promise<object[]> => {
    const result = await semesterData.find(
        {
            semester: { $in: semesterRec },
        },
        { _id: false },
    );
    return result;
};

const queryDataWithSemAndSub = async (
    semesterRec: string,
    subjectRec: string,
): Promise<object[]> => {
    const result = await semesterData.find(
        {
            semester: semesterRec,
            'subjectData.subjectName': subjectRec,
        },
        { _id: false },
    );

    return result;
};
const queryDataWithQuestion = async (
    questionRec: string,
): Promise<object[]> => {
    const result = await semesterData.find(
        {
            'subjectData.questionBank.question': questionRec,
        },
        { _id: false },
    );
    return result;
};
const queryDataWithAnswer = async (answerRec: object): Promise<object[]> => {
    const result = await semesterData.find(
        {
            'subjectData.questionBank.answer': answerRec,
        },
        { _id: false },
    );
    return result;
};

export {
    queryDataWithSemester,
    queryDataWithSemAndSub,
    queryDataWithQuestion,
    queryDataWithAnswer,
};
