const {User,Product } = require('./models');

User.sync({alter:true});
Product.sync({alter: true});