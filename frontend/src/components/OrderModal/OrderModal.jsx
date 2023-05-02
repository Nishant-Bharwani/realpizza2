import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRazorpayKey } from "../../http";
import styles from "./OrderModal.module.css";
const OrderModal = (props) => {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const userId = useSelector((state) => state.authSlice.user._id);
    const user = useSelector((state) => state.authSlice.user);



    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: { key } } = await getRazorpayKey();
        const options = {
            key,
            amount: props.orderData.order.totalPrice,
            currency: "INR",
            name: "Real Pizza",
            description: "Test Transaction",
            image: `${process.env.REACT_APP_API_URL}/storage/logo.png`,
            order_id: props.orderData.razorpayOrder.id,
            callback_url: `${process.env.REACT_APP_API_URL}/api/order/confirmOrder?orderId=${props.orderData.order.orderId}&address=${address}&phone=${phone}`,
            headers: {
                address: address,
                phone: phone
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: props.orderData.order.phone
            },
            notes: {
                "address": "Razorpay Corporate Office",
                "orderId": props.orderData.order.orderId
            },
            theme: {
                "color": "#dd4b39"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        props.onClose();
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 27) {
            props.onClose();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [props.onClose]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* <button className="closeBtn" onClick={onClose}>
                    x
                </button> */}
                <h2>Place Your Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone No.:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit">Place Order</button>
                        <button type="button" onClick={props.onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );



    // return (
    //     <div className="modal" tabIndex="-1" role="dialog">
    //         <div className="modal-dialog modal-dialog-centered" role="document">
    //             <div className="modal-content">
    //                 <div className="modal-header">
    //                     <h5 className="modal-title text-danger">Place Your Order</h5>
    //                     <button type="button" className="close" onClick={onClose} aria-label="Close">
    //                         <span aria-hidden="true">&times;</span>
    //                     </button>
    //                 </div>
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="modal-body">
    //                         <div className="form-group">
    //                             <label htmlFor="quantity">Quantity:</label>
    //                             <input
    //                                 type="number"
    //                                 id="quantity"
    //                                 value={quantity}
    //                                 onChange={handleQuantityChange}
    //                                 min="1"
    //                                 required
    //                                 className="form-control"
    //                             />
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="address">Address:</label>
    //                             <input
    //                                 type="text"
    //                                 id="address"
    //                                 value={address}
    //                                 onChange={handleAddressChange}
    //                                 required
    //                                 className="form-control"
    //                             />
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="phone">Phone No.:</label>
    //                             <input
    //                                 type="tel"
    //                                 id="phone"
    //                                 value={phone}
    //                                 onChange={handlePhoneChange}
    //                                 required
    //                                 className="form-control"
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="modal-footer">
    //                         <button type="submit" className="btn btn-danger">Place Order</button>
    //                         <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );


};

export default OrderModal;
