const express = require('express');
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/signup', AuthController.signup);
authRouter.post('/check', AuthController.check);

module.exports = authRouter;