import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Payment from './components/Payment';

function Header({ cartCount }) {
    const nav = useNavigate();
    const handleCartClick = () => {
        nav('/menu');
        setTimeout(() => {
            const orderSection = document.querySelector('.order-section');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="logo-container">
                    <h1 className="app-title">Owen Express</h1>
                </div>
                <nav className="app-nav">
                    <button className="nav-button" onClick={() => nav('/menu')}>Menu</button>
                    <button className="nav-button cart-button" onClick={handleCartClick}>
                        <span className="cart-count">{cartCount}</span>
                        <svg className="cart-icon" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </header>
    );
}

function App() {
    const [cart, setCart] = useState([]);
    return (
        <Router>
            <div className="app-container">
                <Header cartCount={cart.length} />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Showcase />} />
                        <Route path="/menu" element={<Home cart={cart} setCart={setCart} />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>Owen Express</h3>
                            <p>Premium food delivery service</p>
                        </div>
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <a href="/">Back to Showcase</a>
                            <a href="/menu">Menu</a>
                        </div>
                        <div className="footer-section">
                            <h4>Contact</h4>
                            <p>owenexpress@gmail.coom</p>
                            <p>+91 98763ff543210</p>
                        </div>
                    </div>
                    <div className="copyright">
                      <p>Made by React Rebel</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;