const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const userRepository = require("../repositories/user.repository");

class AuthService {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const verificationToken = uuidv4();

        const createdUser = await userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword, verificationToken,
        });

        const userData = {
            id: createdUser.id,
            nama: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            isVerified: createdUser.isVerified,
        }

        return user;
    }
}

module.exports = new AuthService();