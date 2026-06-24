const authService = require("../services/auth.service");
const {successResponse, errorResponse} = require("../utils/apiResponse")


class AuthController {
    async register(req,res) {
        try {
            const user = await authService.register(req.body);
            return successResponse(res,"Register success",user,201);
        } catch (error) {
            return errorResponse(res,error.message,400)
        }
    }

    async verifyEmail(req,res) {
    try {
        const {token} = req.query

        console.log("TOKEN:", token);

        await authService.verifyEmail(token);

        return successResponse(res,"Email verified successfully")
    } catch(error) {
        return errorResponse(res,error.message)
    }
}
    async login(req,res) {
        try {
            const result = await authService.login(req.body)
            return successResponse(res,"Login success",result)
        } catch (error) {
            return errorResponse(res,error.message)
        }
    }
    }

module.exports = new AuthController;