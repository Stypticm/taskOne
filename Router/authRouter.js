const Router = require('express').Router
const AuthController = require('../Controller/AuthController')

const authRouter = new Router();

authRouter.post('/registration', AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/refresh', AuthController.refresh)


module.exports = authRouter