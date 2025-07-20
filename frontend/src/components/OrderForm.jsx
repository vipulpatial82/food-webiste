import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const grouped = cart.reduce((acc, item) => {
        const found = acc.find(i => i.name === item.name);
        if (found) {
            found.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/payment', {
            state: {
                cart: grouped,
                address: {
                    name,
                    address,
                    phone
                }
            }
        });
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            margin: '2rem 0'
        }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Summary</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Item</th>
                        <th style={{ textAlign: 'right', padding: '10px' }}>Price</th>
                        <th style={{ textAlign: 'center', padding: '10px' }}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {grouped.map((item, idx) => (
                        <tr key={idx}>
                            <td style={{ padding: '10px' }}>{item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</td>
                            <td style={{ textAlign: 'right', padding: '10px' }}>₹{item.price * item.quantity}</td>
                            <td style={{ textAlign: 'center', padding: '10px' }}>
                                <button style={{
                                    background: '#fff',
                                    color: '#e53935',
                                    border: '2px solid #e53935',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }} onClick={() => removeFromCart(cart.findIndex(i => i.name === item.name))}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ fontWeight: 'bold', padding: '10px' }}>Total:</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', padding: '10px' }}>₹{total}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delivery Address</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #ddd',
                        fontSize: '1rem'
                    }}
                />
                <textarea
                    placeholder="Your Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        resize: 'vertical',
                        minHeight: '80px'
                    }}
                />
                <input
                    type="tel"
                    placeholder="Your Phone"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #ddd',
                        fontSize: '1rem'
                    }}
                />
                <button type="submit" style={{
                    background: '#fff',
                    color: '#e53935',
                    border: '2px solid #e53935',
                    padding: '0.9rem 1.3rem',
                    borderRadius: '2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    alignSelf: 'flex-start'
                }}>
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
