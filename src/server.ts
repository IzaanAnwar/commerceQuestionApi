// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import connectToDB from './services/connectDB';

import adminRoute from './routes/adminRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRoute);

const PORT = process.env.PORT ? process.env.PORT : 3100;

app.listen(PORT, () => {
    connectToDB(process.env.MONGODB_PASSWORD as string);
    console.log(`[CONNECTED_TO_SERVER] -[PORT::${PORT}]`);
});
