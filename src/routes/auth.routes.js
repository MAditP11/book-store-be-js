const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const {registerValidation,loginValidation} = require("../middlewares/validators/auth.validator");

const validate = require("../middlewares/validation.middleware");

router.post("/register", registerValidation, validate, authController.register);
router.get("/verify-email", authController.verifyEmail)
router.post("/login", loginValidation, validate, authController.login)

module.exports = router;