import express from 'express';

import { getAllQuestion, getAnswerOfQuestion } from '../controller/getData';
import { postNewQuestionData } from '../controller/addData';

const router = express.Router();

router.post('/', postNewQuestionData);
router.get('/:sem/:sub', getAllQuestion);
router.get('/get-ans', getAnswerOfQuestion);

export default router;
