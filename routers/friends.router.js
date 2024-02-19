const express = require('express');
const { 
    getFriend,
    getFriends,
    postFriend
} = require('../controllers/friends.controller');

const friendsRouter = express.Router()

friendsRouter.use((req, res, next) => {
    console.log("IP address: " + req.ip);
    next();
})

friendsRouter.post('/', postFriend)
friendsRouter.get('/', getFriends);
friendsRouter.get('/:friendId', getFriend);

module.exports = friendsRouter;