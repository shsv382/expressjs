const { User } = require('../models/users.model');

class UsersController {
    async create(req, res, next) {
        const user = await User.create(req.body);
        return res.json(user)
    }

    async getOne(req, res) {
        const { id } = req.params;
        const user = await User.findOne({
            where: {id}
        })
        return res.json(user)
    }

    async getAll(req, res) {
        const users = await User.findAndCountAll()
        return res.json(users)
    }
}

module.exports = new UsersController()