const authService = require("../services/auth.service");
const {successResponse, errorResponse} = require("../utils/apiResponse")


class AuthController {
    async register(req,res) {
        try {
            const user = await authService.register(req.body);
            return successResponse(res,"Register success"),user,201;
        } catch (error) {
            return errorResponse(res,error.message,400)
        }
    }
}

module.exports = new AuthController;