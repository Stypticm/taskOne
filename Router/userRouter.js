const Router = require('express').Router
const UserController = require('../Controller/UserController')

const userRouter = new Router();

userRouter.post('/users', UserController.create)
userRouter.get('/users', UserController.getAll)
userRouter.get('/users/:id', UserController.getOne)
userRouter.delete('/users/:id', UserController.delete)
userRouter.put('/users', UserController.update)

module.exports = userRouter