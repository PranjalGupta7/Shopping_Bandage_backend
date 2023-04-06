const express = require('express');
const app = express();

const authRoutes = require('./auth');
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const orderRoutes = require('./orders')

app.use('/', authRoutes);
app.use('/', productRoutes)
app.use('/', cartRoutes)
app.use('/', orderRoutes)

module.exports = app;