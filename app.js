const express = require('express');
const authMiddleware = require('./src/middleware/authenticationMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const publicRoutes = require('./src/public/routes');
const adminRoutes = require('./src/admin/routes');
const cookieParser =require('cookie-parser');

const app = express();
app.use(cors({origin: '*'}));
app.use(cookieParser());
app.use(bodyParser.json({inflate: true}));
app.use(authMiddleware);
app.use('/',publicRoutes);
app.use('/',adminRoutes);
app.listen(80)
