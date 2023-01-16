const express = require('express');
const authMiddleware = require('./src/middleware/authenticationMiddleware');
const cors = require('cors');
const profileRoutes = require('./src/profileController/routes');
const productRoutes = require('./src/productController/routes');
const dotEnv = require('dotenv');
const app = express();

app.use(cors({origin: '*'}));
dotEnv.config();
app.use(express.json());
app.use(authMiddleware);
app.use('/',profileRoutes);
app.use('/',productRoutes);
app.listen(80)
