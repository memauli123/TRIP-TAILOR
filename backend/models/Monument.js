// backend/models/Monument.js
const mongoose = require('mongoose');

const monumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    establishmentYear: { type: String },
    timeNeeded: { type: String },
    reviewRating: { type: Number, default: 0 },
    entranceFee: { type: String },
    nearbyAirport: { type: String },
    weeklyOff: { type: String },
    significance: { type: String },
    bestTimeToVisit: { type: String },
    imageUrl: { type: String, required: true },
    googleMapsLink: { type: String }
});

module.exports = mongoose.model('Monument', monumentSchema);