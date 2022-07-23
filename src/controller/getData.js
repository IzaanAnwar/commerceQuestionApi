const semesterData = require('../models/semesterData');
const validateRecievedData = require('../validators/validateRecievedData');
const queryDB = require('../services/queryDB');

exports.getAllQuestion = async (req, res) => {
    const sem = req.params.sem;
    const sub = req.params.sub;
    const allQuestionsOfSub = await queryDB.queryDataWithSemAndSub(sem, sub);
    if (allQuestionsOfSub.length === 0) {
        res.status(404).send({
            message: 'data not availbale for the sem or sub',
        });
        return;
    }
    res.status(200).json(allQuestionsOfSub);
};

exports.getAnswerOfQuestion = async (req, res) => {
    const { question } = req.body;

    const answerRecieved = await queryDB.queryDataWithQuestion(question);

    if (answerRecieved.length === 0) {
        res.status(404).send({ message: 'answer not found for this question' });
        return;
    }
    res.status(200).json(answerRecieved);
};
