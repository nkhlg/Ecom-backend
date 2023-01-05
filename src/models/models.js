const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'ecomm'
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
    address:{
        type: DataTypes.STRING(50),
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
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price:{
        type: DataTypes.STRING(50),
        allowNull: false

    }
});




module.exports.User = User;
module.exports.Product = Product;