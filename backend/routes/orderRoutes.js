const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/payment', async (req, res) => {
    try {
        const { name, address, phone, cart, total, paymentMethod } = req.body;
        const order = new Order({ name, address, phone, cart, total, paymentMethod });
        await order.save();
        res.status(200).json({ message: 'Order saved!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save order.' });
    }
});

module.exports = router;
