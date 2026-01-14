const router = require('express').Router()
const controller = require('./order.controller')
const webhook = require('./webhook.controller')
const auth = require('../../middlewares/auth.middleware')

router.post('/checkout', auth, controller.checkout)

// webhook (NO AUTH)
router.post('/midtrans/webhook', webhook.midtransWebhook)

module.exports = router
