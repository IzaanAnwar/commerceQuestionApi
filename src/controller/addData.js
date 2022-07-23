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
    console.log(dataInSemesterInSub); // ====================log data queried
    if (dataInSemesterInSub.length === 0) {
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
        console.log('here');

        const insertResult = await semesterData.updateMany(
            {
                $and: [
                    {
                        semester: semesterRecieved,
                        'subjectData.subjectName': subject,
                    },
                ],
            },
            {
                $set: {
                    'subjectData.questionBank.question': questionRecieved,

                    // 'subjectData.questionBank.$.answer': answerRecieved,
                },
            },
            { upsert: false },
        );

        console.log(insertResult);
        res.status(404).json({
            message: {
                acknowledged: insertResult.acknowledged,
            },

            insertResult,
        });
        return;
    }
};
