import { existsSync, promises } from 'fs';

export class CarManager{
constructor(path){
    this.path = path
};

GetCars = async ()=>{
    try{
        if(existsSync(this.path)){
            const cartData = await promises.readFile(this.path = './Data/carros.json', 'utf-8');
            const cars = JSON.parse(cartData)
            return cars
        }else{
            return [];
        };
    }catch(error){
        console.error('el codigo proporcionado ha generado un error en getProduct' + error);
    }
}

GetCarsById = async (id) => {
    try {
        const carts = await this.GetCars();
        const cartIndex = carts.findIndex((cart) => cart.id === id); 
        
        if (cartIndex === -1) {
            console.error('Cart not found');
            return null;
        }
        
        return carts[cartIndex]; 
    } catch (error) {
        console.error('Error getting cart by ID: ' + error);
        return null;
    }
};


addProduct = async (id, productId) => {
    try {
        const cart = await this.GetCarsById(id);

        if (!cart) {
            console.error('Cart not found');
            return;
        }

        const existingProductIndex = cart.products.findIndex((p) => p.product === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        const carts = await this.GetCars();
        const updatedCarts = carts.map((c) => (c.id === id ? cart : c));
        await promises.writeFile(this.path, JSON.stringify(updatedCarts, null, '\t'));

        console.log('Product added to cart successfully');
    } catch (error) {
        console.error('Error adding product to cart: ' + error);
    }
};


newCar = async ()=>{
    try{
        const cars = await this.GetCars();
        const Car = {products:[]}

        if (cars.length === 0) {
            Car.id = 1;
        } else {
            Car.id = cars[cars.length - 1].id + 1
        };
        cars.push(Car)
        await promises.writeFile(this.path = './Data/carros.json', JSON.stringify(cars, null, '\t'));
    }catch(error){
        console.error('el codigo proporcionado ha generado un error en getProduct' + error);
    }
};
}