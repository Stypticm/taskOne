const bcrypt = require('bcrypt')
const UserService = require('../Service/UserService')

class UserController {

    async create(req, res) {
        try {
            const {
                password
            } = req.body
            const hashPassword = await bcrypt.hashSync(password, 3)

            const user = await UserService.create({
                ...req.body,
                password: hashPassword
            })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const users = await UserService.getAll()
            return res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getOne(req, res) {
        try {
            const user = await UserService.getOne(req.params.id)
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req, res) {
        try {
            const user = await UserService.delete(req.params.id)
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req, res) {
        try {
            const {
                password
            } = req.body

            const hashPassword = await bcrypt.hashSync(password, 7)

            const user = await UserService.update({
                ...req.body,
                password: hashPassword
            })
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new UserController()