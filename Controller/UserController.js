import User from '../Schema/UserSchema.js'
import bcrypt from "bcrypt";

class UserController {

    async create(req, res) {
        try {
            const {login, password} = req.body
            const hashPassword = await bcrypt.hashSync(password, 7)
            const user = await User.create({login, password: hashPassword})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getOne(req,res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error("Id не указан");
            }
            const user = await User.findById(id)
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error("Id не указан");
            }
            const user = await User.findByIdAndDelete(id)
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req, res) {
        try {
            const id = req.body._id
            const {login, password} = req.body

            const hashPassword = await bcrypt.hashSync(password, 7)

            const user = await User.findByIdAndUpdate(id, {login, password: hashPassword}, {new: true})
            return res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserController()