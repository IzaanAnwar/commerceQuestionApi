import { Request, Response } from 'express';
// import { DocumentDefinition } from 'mongoose';

import semesterData, { IData } from '../models/semesterData';
import {
    queryDataWithSemAndSub,
    queryDataWithQuestion,
} from '../services/queryDB';

// LOGIC

export async function postNewQuestionData(req: Request, res: Response) {
    const {
        semester: semesterRecieved,
        subject,
        question: questionRecieved,
        answer: answerRecieved,
    } = req.body;

    if (!semesterRecieved || !subject || !questionRecieved || !answerRecieved) {
        res.status(404).json({
            message:
                "Some Value is missing! check if you typed correct key {'question', 'answer', 'subject', 'semester'} or if you have not provided any value",
        });

        return;
    }

    const dataInSemesterInSub = await queryDataWithSemAndSub(
        semesterRecieved,
        subject,
    );

    if (dataInSemesterInSub.length === 0) {
        const newQuestionBank = new semesterData({
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
            } else {
                res.status(201).json({
                    message: 'succesfully added to database!',
                });
                return;
            }
        });
    } else {
        /** QUERY WITH QUESTION AND IF THE SEM AND SUB MATCH RETURNS DATA EXISTS IF NOT APPEND THE QUESTION */
        const questionsInSemester: Array<IData> = await queryDataWithQuestion(
            questionRecieved,
        );
        for (const semData of questionsInSemester) {
            if (
                semData?.semester === semesterRecieved &&
                semData.subjectData?.subjectName === subject
            ) {
                res.status(400).json({
                    message: 'data already exists',
                });
                return;
            }
        }

        const addQuestion = await semesterData.updateOne(
            {
                $and: [
                    {
                        semester: semesterRecieved,
                        'subjectData.subjectName': subject,
                    },
                ],
            },
            {
                $addToSet: {
                    'subjectData.questionBank': {
                        question: questionRecieved,
                        answer: answerRecieved,
                    },
                },
            },
        );
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
}
