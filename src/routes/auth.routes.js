const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const {registerValidation} = require("../middlewares/validators/auth.validator");

const validate = require("../middlewares/validation.middleware");

router.post("/register", registerValidation, validate, authController.register);

module.exports = router;