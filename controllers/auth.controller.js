const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users.model.js');

const generateJWT = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_JWT_KEY,
        {expiresIn: '24h'}
    );
}

class AuthController {
    async signup(req, res) {
        const { email, password } = req.body;
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({
            where: {email}
        });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword})
        const token = generateJWT(user.id, user.email)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль!'))
        }
        const token = generateJWT(user.id, user.email)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({ token })
    }
}

module.exports = new AuthController()