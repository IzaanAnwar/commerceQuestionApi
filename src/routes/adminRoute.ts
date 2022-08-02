import express from 'express';

import {
    getAllQuestion,
    getAllsubjects,
    getAnswerOfQuestion,
} from '../controller/getData';
import { postNewQuestionData } from '../controller/addData';

const router = express.Router();

router.post('/', postNewQuestionData);
router.get('/get-sol/:sem/:sub', getAllQuestion);
router.get('/get-ans', getAnswerOfQuestion);
router.get('/get-sub/:sem', getAllsubjects);

export default router;
