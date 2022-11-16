const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
const cors = require('cors');
const inventoryRoutes = require('./routes/inventories');
const warehouseRoutes = require('./routes/warehouses');

// add middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/inventories', inventoryRoutes);
app.use('/warehouses', warehouseRoutes);

// start server 
app.listen(PORT, function () {
    console.log(`the server is running on ${PORT}`);
});