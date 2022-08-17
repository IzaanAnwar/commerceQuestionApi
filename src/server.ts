import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getSemesterData, getSubjectData } from './querydb';

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (_req: Request, res: Response) => {
    const allquestions = await prisma.semester.findMany({
        include: {
            subjects: true,
        },
    });
    if (allquestions.length === 0) {
        res.status(404).send('Nothing in DB!');
        return;
    }
    res.status(200).send({ data: allquestions });
});

app.post('/', async (req: Request, res: Response) => {
    const { question, answer, semester, subject } = req.body;
    const dataInSem = await getSemesterData(semester);

    if (!dataInSem) {
        try {
            const sentData = await prisma.semester.create({
                data: {
                    name: semester,
                    subjects: {
                        create: {
                            name: subject,
                            solutions: {
                                create: {
                                    question: question,
                                    answer: answer,
                                },
                            },
                        },
                    },
                },
            });
            res.status(201).send({
                response: `Successfully added to Semester-${sentData.name}`,
            });
            return;
        } catch (error) {
            res.status(404).json({
                response: 'Something went wrong',
                error,
                data: dataInSem,
            });
            return;
        }
    }

    const updatingData = await prisma.subject.upsert({
        where: {
            name: subject,
        },
        create: {},
    });
});

const PORT = process.env.PORT ? process.env.PORT : 3100;

app.listen(PORT, () => {
    console.log(`[CONNECTED_TO_SERVER] -[PORT::${PORT}]`);
});
