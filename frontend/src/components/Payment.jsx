import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const [selected, setSelected] = useState('upi');
    const [paid, setPaid] = useState(false);
    const location = useLocation();
    const cart = location.state?.cart || [];
    const address = location.state?.address || {};

    const handlePay = async () => {
        const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

        const orderData = {
            name: address.name || 'Customer',
            address: address.address || 'Address',
            phone: address.phone || '0000000000',
            cart: cart,
            total: total,
            paymentMethod: selected
        };

        try {
            const res = await fetch('http://localhost:5000/api/orders/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                setPaid(true);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (err) {
            alert('Error connecting to server.');
        }
    };
    
    return (
        <div className="payment-container" style={{ maxWidth: '480px', margin: '32px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(255,59,59,0.10)', padding: '32px 24px' }}>
            {!paid ? (
                <>
                    <h2 style={{ textAlign: 'center', color: '#222', marginBottom: '24px', fontWeight: 'bold' }}>Select Payment Method</h2>
                    <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                        <div className={`payment-method${selected === 'upi' ? ' selected' : ''}`} onClick={() => setSelected('upi')}>
                            <div className="payment-icon">
                                <img src={`${process.env.PUBLIC_URL}/images/upi.png`} alt="UPI" style={{ width: '48px', height: '32px' }} />
                            </div>
                            <span>UPI Payment</span>
                        </div>
                        <div className={`payment-method${selected === 'credit' ? ' selected' : ''}`} onClick={() => setSelected('credit')}>
                            <div className="payment-icon">
                                <img src={`${process.env.PUBLIC_URL}/images/credit-card.png`} alt="Credit Card" style={{ width: '48px', height: '32px' }} />
                            </div>
                            <span>Credit Card</span>
                        </div>
                        <div className={`payment-method${selected === 'cod' ? ' selected' : ''}`} onClick={() => setSelected('cod')}>
                            <div className="payment-icon">
                                <img src={`${process.env.PUBLIC_URL}/images/cash-on-delivery.png`} alt="Cash on Delivery" style={{ width: '48px', height: '32px' }} />
                            </div>
                            <span>Cash on Delivery</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="pay-now-button" onClick={handlePay}>
                            Pay Now
                        </button>
                    </div>
                </>
            ) : (
                <div className="success-message" style={{ textAlign: 'center', marginTop: '40px' }}>
                    <div style={{ fontSize: '3rem', color: '#ff3b3b', marginBottom: '16px' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h2 style={{ color: '#ff3b3b', fontWeight: 'bold' }}>Payment Successful!</h2>
                    <p>Your order has been placed and will be delivered soon.</p>
                </div>
            )}
        </div>
    );
};

export default Payment;
