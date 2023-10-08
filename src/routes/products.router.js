import { Router } from "express";
import { ProductManager } from '../../manager/ProductManager.js';
import { dataPath } from "../utils.js";
const mercado = new ProductManager(dataPath);

const router = Router();

router.get('/', async (req, res) => {
    try {
            const limit = parseInt(req.query.limit);
            const validarLimit = isNaN(limit) ? null : limit;
            const listaDeProductos = await mercado.getProduct(validarLimit);
            res.send({status: 'success', payload: listaDeProductos});
        } 
    catch (error) {
            res.status(500).send('Error obteniendo productos: ' + error);
        }
    });

router.get('/:pid', async (req, res)=>{
    try{
        const id = parseInt(req.params.pid);
        const listaDeProductosById = await mercado.getProductById(id)
        if(!listaDeProductosById){
            return res.status(400).send({ status: 'error', payload: 'Producto no encontrado' });
        }
        return res.send({status: 'success', payload: listaDeProductosById})
    }catch(error){
        res.status(500).send('Error obteniendo productos: ' + error);
    }
    });

    router.post('/', async (req, res) => {
        try {
            const { tittle, description, price, code, stock, thumbnails, status } = req.body;
            if (!tittle || !description || !price || !code || !stock || !thumbnails || !status){
                return res.status(400).send({ status: 'error', payload: 'requiere llenar todos los campos' });
            } else{
                mercado.addProduct(tittle, description, price, code, stock, thumbnails, status);
                return res.send({ status: 'success', payload: req.body });
            }
        } catch (error) {
            res.status(500).send('Error obteniendo productos: ' + error);
        }
    });
    router.put('/:pid', async (req, res) => {
        try {
                const id = parseInt(req.params.pid);
            const { tittle, description, price, code, stock, thumbnails, status } = req.body;
                const cargar = await mercado.updateProduct(id, tittle, description, price, code, stock, thumbnails, status);
                const successMessage = 'Product updated successfully';
                if(!cargar){
                    return res.status(400).send({ status: 'error', payload: 'Producto no encontrado' });
                }
                return res.send({ status: 'success', payload: cargar, message: successMessage });
            } catch (error) {
                res.status(500).send('Error obteniendo productos: ' + error);
            }
        });

        router.delete('/:pid', async (req, res) => {
            try {
                const id = parseInt(req.params.pid);
                const product = await mercado.getProductById(id);
        
                if (product === undefined) {
                    return res.status(400).send({ status: 'error', payload: 'Producto no encontrado' });
                }
        
                const borrarProducto = await mercado.deleteProduct(id);
                return res.send({ status: 'success', payload: `El producto ${id} ha sido borrado con éxito` });
            } catch (error) {
                res.status(500).send('Error obteniendo productos: ' + error);
            }
        });

export default router