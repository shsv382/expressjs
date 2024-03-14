const express = require('express');
const UsersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/', UsersController.create);
usersRouter.get('/', UsersController.getAll);
usersRouter.get('/:id', UsersController.getOne);

module.exports = usersRouter;