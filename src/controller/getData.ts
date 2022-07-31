import { Request, Response } from 'express';

// import semesterData from '../models/semesterData';
// import validateRecievedData from '../validators/validateRecievedData';
import {
    queryDataWithSemAndSub,
    queryDataWithQuestion,
} from '../services/queryDB';

const getAllQuestion = async (req: Request, res: Response) => {
    const sem = req.params.sem;
    const sub = req.params.sub;
    const allQuestionsOfSub = await queryDataWithSemAndSub(sem, sub);
    if (allQuestionsOfSub.length === 0) {
        res.status(404).send({
            message: 'data not availbale for the sem or sub',
        });
        return;
    }
    res.status(200).json(allQuestionsOfSub);
};

const getAnswerOfQuestion = async (req: Request, res: Response) => {
    const { question } = req.body;
    console.log(question, req.body);

    const answerRecieved = await queryDataWithQuestion(question);

    if (answerRecieved.length === 0) {
        res.status(404).send({
            message: 'answer not found for this question',
            answerRecieved,
        });
        return;
    }
    res.status(200).json(answerRecieved);
};

export { getAllQuestion, getAnswerOfQuestion };
