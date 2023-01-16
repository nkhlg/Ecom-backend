const {Sequelize, DataTypes} = require('sequelize');
const dotEnv = require('dotenv');
dotEnv.config();
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    image:{
        type: DataTypes.STRING(1500),
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING(1500),
        allowNull: false,
    }
});


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER(50),
        allowNull: false

    }
});




module.exports.User = User;
module.exports.Product = Product;