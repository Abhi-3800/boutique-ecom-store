const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,        // Use test key in development
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/orders', async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,  // Amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_" + Math.random(),
        });
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;