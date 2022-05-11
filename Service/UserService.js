const User = require('../Schema/UserSchema')

class UserService {

	async create(post) {
		const createdUser = await User.create(post)
		return createdUser
	}

	async getAll() {
		const users = await User.find()
		return users
	}

	async getOne(id) {
		if (!id) {
			throw new Error("Id не указан");
		}
		const user = await User.findById(id)
		return user
	}

	async delete(id) {
		if (!id) {
			throw new Error("Id не указан");
		}
		const user = await User.findByIdAndDelete(id)
		return user
	}

	async update(post) {
		if (!post._id) {
			throw new Error("Id не указан");
		}
		const updatedUser = await User.findByIdAndUpdate(post._id, post, {
			new: true
		})
		return updatedUser
	}
}

module.exports = new UserService()