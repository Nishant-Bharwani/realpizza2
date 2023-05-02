const PizzaModel = require('../models/pizza-model');
const OrderModel = require('../models/order-model');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const userService = require('../services/user-service');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config');
const CartModel = require('../models/cart-model');


const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

class PizzaController {
    async getAllPizzas(req, res) {
        try {
            const pizzas = await PizzaModel.find();
            res.json(pizzas);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getPizza(req, res) {

    }

    // async createOrder(req, res) {

    //     try {
    //         const errors = userService.checkValidation(req);
    //         if (!errors.isEmpty()) {
    //             return res.status(422).json({ errors: errors.array() });
    //         }


    //         const userId = req.userId;
    //         console.log(userId);


    //         const { availablePizzas, customPizzas } = req.body;






    //         // const { base, sauce, cheese, veggies = [], meat = [] } = req.body;
    //         // // Calculate total price
    //         // const veggiePrice = 20;
    //         // const meatPrice = 30;

    //         // const totalPrice = base.price + sauce.price + cheese.price + veggies.length * veggiePrice + meat.length * meatPrice;

    //         // // Create new order
    //         // const orderId = shortid.generate();
    //         // // Create new order
    //         // const order = new OrderModel({
    //         //     userId,
    //         //     orderId,
    //         //     base,
    //         //     sauce,
    //         //     cheese,
    //         //     veggies,
    //         //     meat,
    //         //     totalPrice,
    //         // });
    //         // await order.save();



    //         // Create razorpay order
    //         const razorpayOrder = await razorpay.orders.create({
    //             amount: totalPrice * 100, // Amount in paise
    //             currency: 'INR',
    //             receipt: orderId,
    //         });

    //         res.json({ orderId, razorpayOrder });

    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }

    // }

    // async confirmOrder(req, res) {
    //     try {
    //         const userId = req.userId;
    //         const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    //         // Verify signature
    //         const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    //         hmac.update(orderId + '|' + razorpayPaymentId);
    //         const digest = hmac.digest('hex');
    //         if (digest !== razorpaySignature) {
    //             return res.status(400).json({ message: 'Request signature did not match. Please try again with a valid signature.' })
    //         }


    //         const order = await OrderModel.findOne({ userId, orderId });
    //         if (!order) {
    //             return res.status(404).json({ message: 'Order not found' });
    //         }
    //         if (order.status !== 'created') {
    //             return res.status(400).json({ message: 'Order already processed' });
    //         }


    //         // Update order status
    //         order.status = 'confirmed';
    //         order.razorpayPaymentId = razorpayPaymentId;
    //         order.razorpayOrderId = razorpayOrderId;
    //         await order.save();

    //         res.json({ message: 'Order confirmed' });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

    // async getCartItems(req, res) {
    //     try {
    //         const cart = await CartModel.findOne({ user: req.userId })
    //             .populate('pizzas.pizza', 'name price')
    //             .select('-user -createdAt -updatedAt -__v');
    //         if (!cart) {
    //             return res.status(404).json({ message: 'Cart not found' });
    //         }
    //         return res.status(200).json(cart);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Server Error' });
    //     }
    // }

    // async addToCart(req, res) {
    //     try {
    //         const { pizzaId, quantity } = req.body;
    //         const pizza = await PizzaModel.findById(pizzaId);
    //         if (!pizza) {
    //             return res.status(404).json({ message: 'Pizza not found' });
    //         }
    //         const user = await UserModel.findById(req.userId);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         let cart = await CartModel.findOne({ user: req.userId });
    //         if (!cart) {
    //             cart = new CartModel({ user: req.userId, pizzas: [] });
    //         }
    //         const existingPizza = cart.pizzas.find((p) => p.pizza.equals(pizzaId));
    //         if (existingPizza) {
    //             existingPizza.quantity += quantity;
    //             existingPizza.price += quantity * pizza.price;
    //         } else {
    //             cart.pizzas.push({
    //                 pizza: pizzaId,
    //                 quantity: quantity,
    //                 price: quantity * pizza.price,
    //             });
    //         }
    //         cart.total += quantity * pizza.price;
    //         await cart.save();
    //         return res.status(200).json(cart);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Server Error' });
    //     }
    // }

    // async removeFromCart(req, res) {
    //     try {
    //         const { pizzaId } = req.body;
    //         const cart = await CartModel.findOne({ user: req.userId });
    //         if (!cart) {
    //             return res.status(404).json({ message: 'Cart not found' });
    //         }
    //         const pizzaIndex = cart.pizzas.findIndex((p) => p.pizza.equals(pizzaId));
    //         if (pizzaIndex === -1) {
    //             return res.status(404).json({ message: 'Pizza not found in cart' });
    //         }
    //         const pizza = cart.pizzas[pizzaIndex];
    //         cart.total -= pizza.price;
    //         cart.pizzas.splice(pizzaIndex, 1);
    //         await cart.save();
    //         return res.status(200).json(cart);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Server Error' });
    //     }
    // }
}

module.exports = new PizzaController();






// {
//     "orderId": "44PB9X3Pi",
//     "razorpayOrder": {
//       "id": "order_LgMsChGzKL7jSM",
//       "entity": "order",
//       "amount": 29500,
//       "amount_paid": 0,
//       "amount_due": 29500,
//       "currency": "INR",
//       "receipt": "44PB9X3Pi",
//       "offer_id": null,
//       "status": "created",
//       "attempts": 0,
//       "notes": [],
//       "created_at": 1682064056
//     }
//   }