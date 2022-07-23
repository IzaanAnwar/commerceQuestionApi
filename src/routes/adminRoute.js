const express = require('express');
const mongoose = require('mongoose');

const semesterData = require('../models/semesterData');

const validateRecievedData = require('../validators/validateRecievedData');
const addData = require('../controller/addData');
const getData = require('../controller/getData');

const router = express.Router();

router.post('/', addData.postNewQuestionData);
router.get('/:sem/:sub', getData.getAllQuestion);
router.get('/get-ans', getData.getAnswerOfQuestion);

module.exports = router;
