import User from '../Schema/UserSchema.js'
import bcrypt from 'bcrypt'
import {validationResult} from "express-validator";

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {login, password} = req.body
            const currentUser = await User.findOne({login})
            if (currentUser) {
                return res.status(400).json({message: "Такой пользователь уже существует"})
            }
            const hashPassword = await bcrypt.hashSync(password, 7);
            await User.create({login, password: hashPassword})
            return res.json({message: "Пользователь создан"})
        } catch (error) {
            res.status(400).json(`Ошибка: ${error}`);
        }
    }

    async login(req, res) {
        try {

        } catch (error) {
            res.status(400).json(`Login error: ${error}`);
        }
    }
}

export default new AuthController()