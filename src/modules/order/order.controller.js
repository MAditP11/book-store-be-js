const OrderService = require('./order.service')
const PaymentService = require('./payment.service')
const { User } = require('../../models')

exports.checkout = async (req, res) => {
  const order = await OrderService.checkout(req.user.id, req.body.items)
  const user = await User.findByPk(req.user.id)

  const snapToken = await PaymentService.createSnapToken(order, user)

  res.json({
    orderId: order.id,
    snapToken,
  })
}
