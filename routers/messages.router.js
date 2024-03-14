const express = require('express');
const { 
    getMessages,
    postMessage
} = require('../controllers/messages.controller');

const messagesRouter = express.Router()

messagesRouter.post('/', postMessage)
messagesRouter.get('/', getMessages);
// messagesRouter.get('/:friendId', getFriend);

module.exports = messagesRouter;