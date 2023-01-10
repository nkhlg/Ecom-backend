const express = require('express');
const products = require('./controllers/productController');

const router = express.Router();


router.post('/product', products.add);
router.get('/product', products.view);




module.exports = router;