import mongoose from 'mongoose';

const connectToDB = async (databasePassword: string): Promise<void> => {
    try {
        await mongoose.connect(
            `mongodb+srv://izaan:${databasePassword.replace(
                '@',
                '%40',
            )}@cluster0.boms2em.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('[CONNECTED_TO_DB]');
    } catch (error) {
        console.log(error);
    }
};
export default connectToDB;
