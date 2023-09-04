// models/ServiceRequest.js

const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    email: { type: String, required: true },
    transactionId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

const ServiceRequest = mongoose.model('Payment', serviceRequestSchema);

module.exports = ServiceRequest;