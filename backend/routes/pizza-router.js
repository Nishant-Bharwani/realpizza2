const pizzaRouter = require('express').Router();
const Razorpay = require('razorpay');

const authMiddleware = require('../middlewares/auth-middleware');

const pizzaController = require('../controllers/pizza-controller');


const { pizzaValidationSchema } = require('../middlewares/pizzaValidator-middleware');



pizzaRouter.get('/', pizzaController.getAllPizzas);
// pizzaRouter.post('/createOrder', pizzaValidationSchema, authMiddleware, pizzaController.createOrder);
// pizzaRouter.post('/confirm', authMiddleware, pizzaController.confirmOrder); // Not tested yet
// pizzaRouter.get('/getCart', authMiddleware, pizzaController.getCartItems);
// pizzaRouter.post('/addToCart', authMiddleware, pizzaController.addTocart);
// pizzaRouter.delete('/removeFromCart', authMiddleware, pizzaController.removeFromCart);


module.exports = pizzaRouter;