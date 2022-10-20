const express = require("express");
const routerQuestion = express.Router()

const Question = require('../controllers/Question')
routerQuestion.route('/api/question')
    .get(Question.getAllQuestion)
    .post(Question.addQuestion)

routerQuestion.route('/question/:id')
    .get(Question.getInventarisById)
    .put(Question.update)
    .delete(Question.delete)

module.exports = routerQuestion