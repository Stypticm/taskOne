const AuthService = require('../Service/AuthService')

class AuthController {

    async registration(req, res) {
        try {
            const {
                login,
                password
            } = req.body

            const userData = await AuthService.registration(login, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true
            })

            return res.json(userData)
        } catch (error) {
            res.json(error)
        }
    }

    async login(req, res) {
        try {
            const {
                login,
                password
            } = req.body

            const userData = await AuthService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            res.json(error)
        }
    }

    async logout(req, res) {
        try {
            const {
                refreshToken
            } = req.cookies
            const token = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            res.json(error)
        }
    }

    async refresh(req, res) {
        try {
            const {
                refreshToken
            } = req.cookies
            const userData = await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = new AuthController()