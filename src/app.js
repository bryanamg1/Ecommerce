import express from 'express';
import productsRouter from '../src/routes/products.router.js';
import carsRouter from '../src/routes/car.router.js'
//------------------------------------------------
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(8080, ()=>console.log('estas en 8080'));
//------------------------------------------------

app.use('/api/products', productsRouter);
app.use('/api/carts', carsRouter);
