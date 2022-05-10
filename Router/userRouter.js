import Router from 'express'
import UserController from '../Controller/UserController.js';

const userRouter = new Router();

userRouter.post('/users', UserController.create)
userRouter.get('/users', UserController.getAll)
userRouter.get('/users/:id', UserController.getOne)
userRouter.delete('/users/:id', UserController.delete)
userRouter.put('/users', UserController.update)

export default userRouter