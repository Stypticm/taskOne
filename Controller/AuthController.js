import User from '../Schema/UserSchema.js'
import bcrypt from 'bcrypt'
import {
    validationResult
} from "express-validator";
import jwt from 'jsonwebtoken'

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: '15m'
    })
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({
                    message: "Ошибка при регистрации",
                    errors
                })
            }
            const {
                login,
                password
            } = req.body
            const currentUser = await User.findOne({
                login
            })
            if (currentUser) {
                return res.status(400).json({
                    message: "Такой пользователь уже существует"
                })
            }
            const hashPassword = await bcrypt.hashSync(password, 7);
            await User.create({
                login,
                password: hashPassword
            })
            return res.json({
                message: "Пользователь создан"
            })
        } catch (error) {
            res.status(400).json(`Ошибка: ${error}`);
        }
    }

    async login(req, res) {
        try {
            const {
                login,
                password
            } = req.body
            const user = await User.findOne({
                login
            })

            if (!user) {
                res.status(400).json({
                    message: `Пользователь с таким ${user} не найден`
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                res.status(400).json({
                    message: `Неверный пароль`
                })
            }

            const token = generateAccessToken(user._id)
            return res.json({
                token
            })
        } catch (error) {
            res.status(400).json(`Ошибка авторизации: ${error}`);
        }
    }

}

export default new AuthController()