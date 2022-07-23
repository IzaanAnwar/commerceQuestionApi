const validateRecievedData = (req, res) => {
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

    return {
        semesterRecieved,
        subject,
        questionRecieved,
        answerRecieved,
    };
};

module.exports = validateRecievedData;
