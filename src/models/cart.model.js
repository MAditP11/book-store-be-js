const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    author: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    coverImage: {
        type: DataTypes.STRING
    }
});

module.exports = Book;