import Router from 'express'
import AuthController from '../Controller/AuthController.js';
import {
    check
} from "express-validator";

const authRouter = new Router();

authRouter.post('/registration', [
    check('login', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль не может быть меньше 4 и больше 10 символов").isLength({
        min: 4,
        max: 10
    })
], AuthController.registration)
authRouter.post('/login', AuthController.login)


export default authRouter