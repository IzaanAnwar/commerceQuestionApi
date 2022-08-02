import { Request, Response } from 'express';
import { IData } from '../models/semesterData';

import {
    queryDataWithSemAndSub,
    queryDataWithQuestion,
    queryDataWithSemester,
} from '../services/queryDB';

const getAllQuestion = async (req: Request, res: Response) => {
    const sem = req.params.sem;
    const sub = req.params.sub;
    const allQuestionsOfSub: Array<IData> = await queryDataWithSemAndSub(
        sem,
        sub,
    );
    if (allQuestionsOfSub.length === 0) {
        res.status(404).json({
            message: 'Data not availbale for the sem or sub!',
        });
        return;
    }

    const solutions = allQuestionsOfSub.map((data) => {
        return data.subjectData?.questionBank;
    });
    res.status(200).json({ data: solutions });
};

const getAnswerOfQuestion = async (req: Request, res: Response) => {
    const { question } = req.body;

    const dataRecieved: Array<IData> = await queryDataWithQuestion(question);

    if (dataRecieved.length === 0) {
        res.status(404).json({
            message: 'answer not found for this question',
        });
        return;
    }
    const answerRecieved = dataRecieved.map((data) => {
        return data.subjectData?.questionBank?.filter((questionData) => {
            if (questionData.question === question) {
                return questionData.answer;
            }
        });
    });
    res.status(200).json({ data: answerRecieved });
};

const getAllsubjects = async (req: Request, res: Response) => {
    const semester = req.params.sem;
    const dataRec: Array<IData> = await queryDataWithSemester(semester);
    if (dataRec.length === 0) {
        res.status(404).json({ message: 'Invalid Semester!' });
        return;
    }
    const allSubjects = dataRec.map((data) => {
        return data?.subjectData?.subjectName;
    });

    res.status(200).json({ data: allSubjects });
};

export { getAllQuestion, getAnswerOfQuestion, getAllsubjects };
