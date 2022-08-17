import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getSemesterData = async (semester: string) => {
    return await prisma.semester.findFirst({
        where: {
            name: semester,
        },
        include: {
            subjects: {
                include: {
                    solutions: true,
                },
            },
        },
    });
};

const getSubjectData = async (subject: string, semId: string) => {
    return await prisma.subject.findFirst({
        where: {
            semesterId: semId,
            name: subject,
        },
        include: {
            Semester: true,
            solutions: true,
        },
    });
};

const getAnswer = async (question: string) => {
    return await prisma.questionBank.findFirst({
        where: {
            question: question,
        },
        include: {
            Subject: true,
        },
    });
};

export { getSemesterData, getSubjectData, getAnswer };
