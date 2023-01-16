const express = require('express');
const accounts = require('./controllers/profileController');

const router = express.Router();
router.get('/profile', accounts.profile);

module.exports = router;