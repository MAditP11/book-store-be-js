const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto")

const userRepository = require("../repositories/user.repository");
const { sendVerificationEmail } = require("../utils/mailer");

const {generateToken} = require("../utils/jwt")

class AuthService {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // const verificationToken = uuidv4();
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

        const createdUser = await userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword, verificationToken, verificationTokenExpires,
        });

        await sendVerificationEmail(createdUser.email, verificationToken)

        const userData = {
            id: createdUser.id,
            nama: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            isVerified: createdUser.isVerified,
        }

        return userData;
    }

    async verifyEmail(token) {
        const user = await userRepository.findByVerificationToken(token);
        if (!user) {
            throw new Error("Invalid token")
        }

        if (user.verificationTokenExpires && user.verificationTokenExpires < new Date()) {
            throw new Error("Token expired")
        }

        user.isVerified = true;
        user.verificationToken = null; 
        user.verificationTokenExpires = null;
        await user.save()
        return true
    }

    async login(data) {
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(data.password,user.password)
        if (!isMatch) {
            throw new Error("Invalid credentials")
        }

        if (!user.isVerified) {
            throw new Error("Please verify your email first")
        }

        const token = generateToken({
            id: user.id,
            role: user.role,
            email: user.email,
        })

        return {token, user: {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
        }}
    }
}

module.exports = new AuthService();