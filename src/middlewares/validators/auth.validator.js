const { body } = require("express-validator");

const registerValidation = [
    body("name").notEmpty().withMessage("Name is required").isLength({min:3}).withMessage("Name minimum 3 characters"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required").isLength({min:8}).withMessage("Password minimum 8 characters"),
];

module.exports = {
    registerValidation,
}