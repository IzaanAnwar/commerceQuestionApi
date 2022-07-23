const semesterData = require('../models/semesterData');

const validateRecievedData = require('../validators/validateRecievedData');

const queryDB = require('../services/queryDB');

exports.postNewQuestionData = async (req, res) => {
    const { semesterRecieved, subject, questionRecieved, answerRecieved } =
        validateRecievedData(req, res);

    const dataInSemesterInSub = await queryDB.queryDataWithSemAndSub(
        semesterRecieved,
        subject,
    );

    console.log(dataInSemesterInSub, 'here'); // ====================log data queried
    if (dataInSemesterInSub.length === 0) {
        console.log('shoud not enter here');
        const newQuestionBank = new semesterData({
            semester: semesterRecieved,
            subjectData: {
                subjectName: subject,
                questionBank: {
                    question: questionRecieved,
                    answer: answerRecieved,
                },
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
        console.log('heresdfsdf');

        const questionsInSemester = await queryDB.queryDataWithQuestion(
            questionRecieved,
        );

        for (let i = 0; i < questionsInSemester.length; i++) {
            console.log(
                '====> ' + questionsInSemester.length,
                questionsInSemester[i],
                i + '<=======',
            );

            if (
                questionsInSemester[i].semester === semesterRecieved &&
                questionsInSemester[i].subjectData.subjectName === subject
            ) {
                console.log('in');

                res.status(400).json({
                    message: 'data already exists',
                });
            }
            console.log('out');

            return;
        }
        console.log('2');

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
};
