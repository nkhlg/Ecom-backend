const express = require('express');
const authMiddleware = require('./src/middleware/authenticationMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const publicRoutes = require('./src/public/routes');

const app = express();
app.use(cors({origin: '*'}));
app.use(authMiddleware);
app.use(bodyParser.json({inflate: true}));
app.use('/',publicRoutes);
app.listen(80)
