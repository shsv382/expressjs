const messages = require('../models/messages.model');

function getMessages(req, res) {
    res.json(messages)
}

function postMessage(req, res) {
    console.log(req.body)
    if ((!req.body.senderId && req.body.senderId !== 0) || 
        (!req.body.receiverId && req.body.receiverId !== 0) || 
         !req.body.text) {
        return res.status(400).json({error: "Bad data format"})
    }
    const newMessage = {
        id: messages[messages.length-1].id + 1,
        senderId: Number(req.body.senderId),
        receiverId: Number(req.body.receiverId),
        text: req.body.text
    }
    messages.push(newMessage);
    res.status(200).json(newMessage)
}

module.exports = {
    getMessages,
    postMessage
}