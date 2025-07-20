

import React from 'react';
import './ItemList.css';

const ItemList = ({ items, addToCart }) => {
    return (
        <div className="featured-grid">
            {items.map(item => (
                <div className="featured-card" key={item.id}>
                    <div className="card-image" 
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${item.image})` }}>
                    </div>
                    <div className="card-content">
                        <h3>{item.name}</h3>
                        <p className="card-description">{item.description}</p>
                        <div className="card-footer">
                            <span className="price">₹{item.price}</span>
                            {addToCart && (
                                <button className="add-cart-btn attractive-btn" onClick={() => addToCart(item)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;