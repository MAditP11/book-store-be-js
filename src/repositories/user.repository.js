const User = require("../models/user.model");

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({
            where: {email},
        });
    }

    async findById(id) {
        return await User.findByPk(id)
    }

    async findByVerificationToken(token) {
        return await User.findOne({
            where: {
                verificationToken: token,
            },
        })
    }

    async create(userData) {
        return await User.create(userData);
    }

    async update(id, userData) {
        const user = await this.findById(id)
        if (!user) return null
        return user.update(userData)
    }

    async delete(id, userData) {
        const user = await this.findById(id)
        if (!user) return null
        await user.destroy()
        return true
    }
}

module.exports = new UserRepository;