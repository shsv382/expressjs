const messages = require('../models/messages.model');
const jwt = require('jsonwebtoken');

function getMessages(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    jwt.verify(token, process.env.SECRET_JWT_KEY, function(error, decoded) {
        if (error) {
            return res.status(403).json({error})
        }
        let { id } = decoded;
        let filteredMessages = messages.filter(message => (message.senderId == id || message.receiverId == id))
        return res.status(200).json(filteredMessages)
    });
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