const snap = require('../../config/midtrans')

exports.createSnapToken = async (order, user) => {
  const payload = {
    transaction_details: {
      order_id: `ORDER-${order.id}`,
      gross_amount: order.total,
    },
    customer_details: {
      first_name: user.name,
      email: user.email,
    },
  }

  const transaction = await snap.createTransaction(payload)

  return transaction.token
}
