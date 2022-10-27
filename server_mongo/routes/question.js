const express = require("express");
const routerQuestion = express.Router()

const Question = require('../controllers/Question')
routerQuestion.route('/api/question')
    .get(Question.getAllQuestion)
    .post(Question.addQuestion)

routerQuestion.route('/api/question/:id')
    .get(Question.getQuestionById)
    .put(Question.update)
    .delete(Question.delete)

module.exports = routerQuestion