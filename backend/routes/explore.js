// backend/routes/explore.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Monument = require('../models/Monument');

router.get('/restaurants', async (req, res) => {
    try {
        const { city, cuisine, minRating, maxCost, search } = req.query;
        let query = {};
        
        if (city) query.city = new RegExp(city, 'i');
        if (cuisine) query.cuisine = new RegExp(cuisine, 'i');
        if (minRating) query.rating = { $gte: Number(minRating) };
        if (maxCost) query.cost = { $lte: Number(maxCost) };
        if (search) query.name = new RegExp(search, 'i');

        const restaurants = await Restaurant.find(query).limit(50);
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ msg: 'Server error fetching restaurants' });
    }
});

router.get('/monuments', async (req, res) => {
    try {
        const { city, state, type, minRating, search } = req.query;
        let query = {};

        if (city) query.city = new RegExp(city, 'i');
        if (state) query.state = new RegExp(state, 'i');
        if (type) query.type = new RegExp(type, 'i');
        if (minRating) query.reviewRating = { $gte: Number(minRating) };
        if (search) query.name = new RegExp(search, 'i');

        const monuments = await Monument.find(query).limit(50);
        res.json(monuments);
    } catch (err) {
        res.status(500).json({ msg: 'Server error fetching monuments' });
    }
});

module.exports = router;