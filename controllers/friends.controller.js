const friends = require('../models/friends.model');

function getFriends(req, res) {
    res.json(friends)
}

function getFriend(req, res) {
    const id = Number(req.params.friendId);
    const friend = friends.find(f => f.id === id);
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).json({error: "Friend not found"})
    }
}

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({error: "Bad data format"})
    }
    const newFriend = {
        id: friends[friends.length-1].id + 1,
        name: req.body.name
    }
    friends.push(newFriend);
    res.status(200).json(newFriend)
}

module.exports = {
    getFriend,
    getFriends,
    postFriend
}