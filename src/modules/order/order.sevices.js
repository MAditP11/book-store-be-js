const { sequelize, Order, OrderItem, Book } = require('../../models')

exports.checkout = async (userId, items) => {
  return sequelize.transaction(async (t) => {
    let total = 0

    for (const item of items) {
      const book = await Book.findByPk(item.bookId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      })

      if (!book || book.stock < item.qty) {
        throw new Error('Stock not available')
      }

      book.stock -= item.qty
      await book.save({ transaction: t })

      total += book.price * item.qty
    }

    const order = await Order.create(
      {
        UserId: userId,
        total,
      },
      { transaction: t }
    )

    for (const item of items) {
      const book = await Book.findByPk(item.bookId)

      await OrderItem.create(
        {
          OrderId: order.id,
          BookId: item.bookId,
          qty: item.qty,
          price: book.price,
        },
        { transaction: t }
      )
    }

    return order
  })
}
