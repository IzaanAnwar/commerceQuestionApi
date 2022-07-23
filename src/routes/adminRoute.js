const express = require('express');
const mongoose = require('mongoose');

const semesterData = require('../models/semesterData');

const validateRecievedData = require('../validators/validateRecievedData');
const addData = require('../controller/addData');

const router = express.Router();

router.post('/', addData.postNewQuestionData);

module.exports = router;
