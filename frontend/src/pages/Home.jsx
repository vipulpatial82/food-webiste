import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';
import OrderForm from '../components/OrderForm';
import Payment from '../components/Payment';
import './Home.css';

const Home = ({ cart, setCart }) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 1,
            name: "Butter Chicken",
            description: "Tender chicken in rich tomato and butter sauce",
            price: 350,
            image: "butterchicken.png"
        },
        {
            id: 2,
            name: "Biryani",
            description: "Fragrant rice with spices and choice of meat",
            price: 280,
            image: "briyani.png"
        },
        {
            id: 3,
            name: "Masala Dosa",
            description: "Crispy rice crepe with spiced potato filling",
            price: 180,
            image: "Masaladosa.png"
        }
    ];

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleCartClick = () => {
        navigate('/menu');
        setTimeout(() => {
            let tries = 0;
            const scrollToOrder = () => {
                const orderSection = document.querySelector('.order-section');
                if (orderSection) {
                    orderSection.scrollIntoView({ behavior: 'smooth' });
                } else if (tries < 10) {
                    tries++;
                    setTimeout(scrollToOrder, 100);
                }
            };
            scrollToOrder();
        }, 200);
    };

    return (
        <div className="menu-container">
            <div className="menu-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <h3 style={{ position: 'absolute', left: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
                    <button className="back-button" onClick={() => navigate(-1)} style={{ fontSize: '1.25rem', padding: '6px 16px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </span>
                        <span>Back to Showcase</span>
                    </button>
                </h3>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h1 style={{ margin: 0 }}>Our Full Menu</h1>
                    <p style={{ marginTop: '8px' }}>Explore our complete selection of premium dishes</p>
                </div>
            </div>

            <div className="menu-content">
                <ItemList items={menuItems} addToCart={addToCart} />
                {cart.length > 0 && (
                    <div className="order-section">
                        <OrderForm cart={cart} removeFromCart={removeFromCart} />
                        <Payment />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;