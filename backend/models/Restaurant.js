// backend/models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    locality: { type: String },
    city: { type: String, required: true },
    cuisine: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    cost: { type: Number },
    imageUrl: { type: String, default: '' },
    googleMapsLink: { type: String }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);