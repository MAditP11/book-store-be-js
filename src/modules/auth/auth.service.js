const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const env = require('../../config/env')

exports.register = async (data) => {
  const exists = await User.findOne({ where: { email: data.email } })
  if (exists) throw new Error('Email already used')

  const hash = await bcrypt.hash(data.password, 10)

  return User.create({
    name: data.name,
    email: data.email,
    password: hash,
  })
}

exports.login = async (data) => {
  const user = await User.findOne({ where: { email: data.email } })
  if (!user) throw new Error('Invalid credentials')

  const ok = await bcrypt.compare(data.password, user.password)
  if (!ok) throw new Error('Invalid credentials')

  const token = jwt.sign({ id: user.id }, env.jwtSecret, { expiresIn: '1d' })

  return { token }
}
