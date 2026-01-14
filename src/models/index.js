const sequelize = require('../config/database')
const { DataTypes } = require('sequelize')

const User = require('./User')(sequelize, DataTypes)
const Book = require('./Book')(sequelize, DataTypes)
const Category = require('./Category')(sequelize, DataTypes)
const Order = require('./Order')(sequelize, DataTypes)
const OrderItem = require('./OrderItem')(sequelize, DataTypes)

Category.hasMany(Book)
Book.belongsTo(Category)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Book.hasMany(OrderItem)
OrderItem.belongsTo(Book)

module.exports = {
  sequelize,
  User,
  Book,
  Category,
  Order,
  OrderItem,
}
