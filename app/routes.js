const express = require('express');

const routes = express.Router();

const userController = require('./controllers/authController');

routes.get('/', userController.signin);
routes.get('/signup', userController.signup);

module.exports = routes;
