const crypto = require('crypto')
const { Order } = require('../../models')

exports.midtransWebhook = async (req, res) => {
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
  } = req.body

  // 1️⃣ Signature Verification
  const payload =
    order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY
  const expectedSignature = crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex')

  if (signature_key !== expectedSignature) {
    return res.status(403).json({ message: 'Invalid signature' })
  }

  // 2️⃣ Ambil orderId asli
  const realOrderId = order_id.replace('ORDER-', '')

  // 3️⃣ Update status
  if (['capture', 'settlement'].includes(transaction_status)) {
    await Order.update({ status: 'paid' }, { where: { id: realOrderId } })
  }

  if (['expire', 'cancel', 'deny'].includes(transaction_status)) {
    await Order.update({ status: 'failed' }, { where: { id: realOrderId } })
  }

  res.json({ received: true })
}
