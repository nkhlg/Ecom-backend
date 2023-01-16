const express = require('express');
const authMiddleware = require('./src/middleware/authenticationMiddleware');
const cors = require('cors');
const publicRoutes = require('./src/profileController/routes');
const adminRoutes = require('./src/productController/routes');
const dotEnv = require('dotenv');
const app = express();

app.use(cors({origin: '*'}));
dotEnv.config();
app.use(express.json());
app.use(authMiddleware);
app.use('/',publicRoutes);
app.use('/',adminRoutes);
app.listen(80)
