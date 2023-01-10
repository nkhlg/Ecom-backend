const express = require('express');
const accounts = require('./controllers/profileController');

const router = express.Router();


router.get('/profile', accounts.profile);
// router.post('/login', accounts.login);



module.exports = router;