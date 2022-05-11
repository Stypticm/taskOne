const jwt = require('jsonwebtoken')
const TokenSchema = require('../Schema/TokenSchema')

class TokenService {

	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_TOKEN_ACCESS, {
			expiresIn: '15m'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_TOKEN_REFRESH, {
			expiresIn: '15m'
		})
		return {
			accessToken,
			refreshToken
		}
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_TOKEN_ACCESS)
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_TOKEN_REFRESH)
			return userData
		} catch (error) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await TokenSchema.findOne({
			user: userId
		})
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save()
		}
		const token = await TokenSchema.create({
			user: userId,
			refreshToken
		})
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenSchema.deleteOne({
			refreshToken
		})
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await TokenSchema.findOne({
			refreshToken
		})
		return tokenData
	}
}

module.exports = new TokenService()