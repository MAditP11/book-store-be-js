const AuthService = require('./auth.service')
const { registerSchema, loginSchema } = require('./auth.schema')

exports.register = async (req, res) => {
  const data = registerSchema.parse(req.body)
  const result = await AuthService.register(data)
  res.json(result)
}

exports.login = async (req, res) => {
  const data = loginSchema.parse(req.body)
  const result = await AuthService.login(data)
  res.json(result)
}
