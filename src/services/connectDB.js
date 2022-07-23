const mongoose = require('mongoose');

const connectToDB = (databasePassword) => {
    mongoose.connect(
        `mongodb+srv://izaan:${databasePassword.replace(
            '@',
            '%40',
        )}@cluster0.boms2em.mongodb.net/?retryWrites=true&w=majority`,
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(
                    `[CONNECTED_TO_DATABASE] on URL :: https://${data.host}`,
                );
            }
        },
    );
};
module.exports = connectToDB;
