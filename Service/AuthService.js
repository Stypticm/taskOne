const User = require('../Schema/UserSchema')
const bcrypt = require('bcrypt')
const TokenService = require('./TokenService')
const UserDto = require('../Dtos/user-dto')
const UserSchema = require('../Schema/UserSchema')

class AuthService {

	async registration(login, password) {
		let currentUser = await User.findOne({
			login
		})
		if (currentUser) {
			throw new Error(`Пользователь с таким именем ${login} уже существует`)
		}

		const hashPassword = await bcrypt.hashSync(password, 3);
		currentUser = {
			login,
			password: hashPassword
		}

		const user = await User.create(currentUser)

		const userDto = new UserDto(user) // login, ig

		const tokens = TokenService.generateToken({
			...userDto
		})
		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async login(login, password) {
		const user = await User.findOne({
			login
		})
		if (!user) {
			throw new Error(`Пользователь с таким именем ${login} не найден`)
		}

		const isPassEqual = await bcrypt.compareSync(password, user.password)
		if (!isPassEqual) {
			throw new Error(`Некорректный пароль`)
		}

		const userDto = new UserDto(user)
		const tokens = TokenService.generateToken({
			...userDto
		})

		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: userDto
		}
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw new Error(`Пользователь не авторизован`)
		}
		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) {
			throw new Error(`Пользователь не авторизован`)
		}

		const user = await UserSchema.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = TokenService.generateToken({
			...userDto
		})

		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: userDto
		}
	}
}

module.exports = new AuthService()