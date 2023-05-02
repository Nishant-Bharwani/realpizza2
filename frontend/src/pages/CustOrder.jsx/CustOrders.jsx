import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../http';
import styles from './Orders.module.css';

const orders = [{
    id: 1, items: [{ name: 'Margherita', size: 'MEDIUM', quantity: 2, price: 400 }, { name: 'Pepperoni', size: 'LARGE', quantity: 1, price: 500 }],
    totalPrice: 900,
    status: 'DELIVERED'
},
{
    id: 2,
    items: [
        {
            name: 'Hawaiian',
            size: 'MEDIUM',
            quantity: 1,
            price: 350
        },
        {
            name: 'Veggie',
            size: 'LARGE',
            quantity: 2,
            price: 600
        }
    ],
    totalPrice: 950,
    status: 'CANCELLED'
}
];


const Orders = () => {


    const [ordersList, setOrdersList] = useState([]);
    const userId = useSelector((state) => state.authSlice.user._id);
    useEffect(() => {
        async function getOrderList() {
            const { data } = await getAllOrders(userId);
            setOrdersList(data);
        }

        getOrderList();

    }, []);

    return (
        <div className={`${styles.orders} container mx-auto`}>
            <div className='d-flex align-items-center pb-4'>
                <img src="/images/cart-black.png" alt="n" />
                <h1 className={`${styles.ordersHeading}`}>Order History</h1>
            </div>

            {ordersList.map(order => (
                <div key={order._id} className={`${styles.order}`}>
                    <div className={`${styles.orderDetails}`}>
                        {/* {order.items.map(item => (
                            <div key={item.name} className='d-flex align-items-center' style={{ margin: '8px 0' }}>
                                <div className='flex-grow-1 ms-4'>
                                    <h1>{item.name}</h1>
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, aut.</span>
                                </div>
                                <span className='flex-grow-1'>{item.quantity} Pcs</span>
                                <span className='font-weight-bold' style={{ fontSize: '1.125rem' }}>Rs. {item.price}</span>
                            </div>
                        ))} */}

                        {order.pizzas.length === 0 ?
                            // <div key={order._id} className='d-flex align-items-center justify-content-center' style={{ margin: '8px 0' }}>
                            <div key={order._id} className={`d-flex align-items-center ms-4 ${styles.singleOrder}`} style={{ margin: '8px 0' }}>
                                {/* <h1>{`${order.base.name ? order.base.name : ""} base, ${order.sauce.name ? order.sauce.name : ""} with ${order.cheese.name ? order.cheese.name : ""} cheese and ${order.veggie1.name ? order.veggie1.name : ""}${order.veggie1.name && order.veggie2.name ? " and " : ""}${order.veggie2.name ? order.veggie2.name : ""} and ${order.meat[0].name ? order.meat[0].name : ""}`}</h1> */}

                                <h5 className='me-3'>{`${order.base.name ? order.base.name : ""} base, ${order.sauce.name ? order.sauce.name : ""} with ${order.cheese.name ? order.cheese.name : ""} cheese and  ${order.veggie1.name ? order.veggie1.name : ""}${order.veggie1.name && order.veggie2.name ? " and " : ""}${order.veggie2.name ? order.veggie2.name : ""} ${order.meat.name ? order.meat.name : ""}`}</h5>
                                <div className='d-flex flex-column'>
                                    <span className='' >1 Pcs</span>
                                    <span className={`${styles.price}`}>Rs. {order.totalPrice}</span>
                                </div>

                                {/* 
                                    <div className={`${styles.orderSummary}`}>
                                        <div className='d-flex flex-column'>
                                            <div><span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Total Amount: </span>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '0.5rem', color: '#dd4b39' }}>Rs. {order.totalPrice}</span></div>
                                            {order.status !== 'DELIVERED' && (
                                                <button type='button' className={`${styles.cancelOrderBtn}`}>Cancel Order</button>
                                            )}
                                            <button type='button' className={`${styles.cancelOrderBtn}`}>View Details</button>

                                    </div> */}




                                {/* <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, aut.</span> */}
                            </div>

                            :
                            order.pizzas.map(pizza => (
                                <div key={pizza.name} className={`d-flex align-items-center ${styles.singleOrder}`} style={{ margin: '8px 0' }}>
                                    <div className='flex-grow-1 ms-4'>
                                        <h5 style={{ fontWeight: 'bold' }}>{pizza.pizza.name}</h5>
                                        <span className='text-muted'>{pizza.pizza.description}</span>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='' >{pizza.quantity} Pcs</span>
                                        <span className={`${styles.price}`}>Rs. {pizza.price}</span>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className={`${styles.orderSummary}`}>
                        <div className='d-flex flex-column'>
                            <div><span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Total Amount: </span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '0.5rem', color: 'rgb(116, 185, 13)' }}>Rs. {order.totalPrice}</span></div>
                            {/* {order.status !== 'DELIVERED' && (
                                <button type='button' className={`${styles.cancelOrderBtn}`}>Cancel Order</button>
                            )} */}
                            <Link to={`/order/${order.orderId}`} style={{ textDecoration: 'none' }}><button type='button' className={`${styles.cancelOrderBtn}`}>View Details</button></Link>

                        </div>

                        {/* <div className={`${styles.orderStatus}`}>
                            <span>Status:</span>
                            <span className={`${order.status === 'DELIVERED' ? 'text-success' : 'text-danger'}`}>{order.status}</span>
                        </div> */}

                    </div>
                </div>
            ))}

            {ordersList.length === 0 && (
                <div className={`${styles.emptyOrders}`}>
                    <h1>You have no orders yet</h1>
                    <Link to='/' className={`${styles.backToHomeBtn}`}>Back to Home</Link>
                </div>
            )}
        </div>
    );
};

export default Orders;
