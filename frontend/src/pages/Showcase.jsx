import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Showcase.css';

const Showcase = () => {
    const [featuredItems, setFeaturedItems] = useState([
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
    ]);
    const navigate = useNavigate();

    return (
        <div className="showcase-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Authentic Indian Cuisine</h1>
                    <p className="subtitle">Experience the rich flavors of traditional Indian cooking</p>
                    <button className="cta-button" onClick={() => navigate('/menu')}>
                        Explore Full Menu
                    </button>
                </div>
            </section>

            <section className="featured-section">
                <div className="section-header">
                    <h2>Chef's Specials</h2>
                    <p>Our most popular Indian dishes</p>
                </div>
                <div className="featured-grid">
                    {featuredItems.map(item => (
                        <div className="featured-card" key={item.id}>
                            <div className="card-image" 
                                 style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${item.image})` }}>
                            </div>
                            <div className="card-content">
                                <h3>{item.name}</h3>
                                <p className="card-description">{item.description}</p>
                                <div className="card-footer">
                                    <span className="price">₹{item.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Showcase;