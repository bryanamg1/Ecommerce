import { Router } from "express";
import { CarManager } from '../../manager/CarsManager.js';
import { carrosPath } from "../utils.js";
const carritos = new CarManager(carrosPath);

const router = Router();

router.get('/:cid', async(req,res)=>{
    try{
        const id = parseInt(req.params.cid)
        const carritoById = await carritos.GetCarsById(id)
        res.send({status: 'success', payload: carritoById})
    }catch(error) {
        res.status(500).send('Error obteniendo productos: ' + error);
    }
})

router.post('/',async(req,res)=>{
    try{
        carritos.newCar()
        res.send({ status: 'success', payload: req.body });
    }catch(error) {
    res.status(500).send('Error obteniendo productos: ' + error);
}})


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        await carritos.addProduct(id, productId);
        res.send({ status: 'success', message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).send('Error adding a product to the cart: ' + error.message);
    }
});

export default router