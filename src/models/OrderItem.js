module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItem', {
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  })
}
