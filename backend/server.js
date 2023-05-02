require('dotenv').config();
const { HOST } = require('./config');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRouter = require('./routes/auth-route');
const pizzaRouter = require('./routes/pizza-router');
const dbConnect = require('./db/conn');
const orderRouter = require('./routes/order-router');
const adminRouter = require('./routes/admin-router');
const Emitter = require('events');
const { RAZORPAY_KEY_ID } = require('./config');

const app = express();
console.log(process.env.BASE_URL);
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
dbConnect();

// app.use(session({
//     secret: 
// }));

app.use(cookieParser());
app.use(cors({
    credentials: true,
    // origin: ['http://localhost:3000'],
    origin: [`${process.env.CLIENT_URL}`, 'http://localhost:3000']
}));

app.use('/storage', express.static('storage'));


app.get('/', (req, res) => {
    res.send("Hello");
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/pizza', pizzaRouter);
app.use('/api/admin', adminRouter)
app.use('/api/order', orderRouter);



app.get('/api/razorpay/getKey', (req, res) => {
    res.status(200).json({
        key: RAZORPAY_KEY_ID
    });
});


server.listen(PORT, HOST, function(err) {
    if (err) return console.log(err);
    console.log(`Listening on http://${HOST}:${PORT}`);
});



// const io = require('socket.io')(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', "POST"]
//     }
// });


const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

const io = require('./socket.js').init(server);
io.on('connection', (socket) => {
    console.log(socket.id);


    socket.on('join', (orderId) => {
        console.log(orderId);
        socket.join(orderId);
    });
});


eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.orderId}`).emit('orderUpdated', data);
});

eventEmitter.on('orderConfirmedCart', (data) => {
    io.to(`adminOrderPage`).emit('orderConfirmedCart', data);
});

module.exports = { io };