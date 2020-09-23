const mongoose = require('mongoose');
module.exports = mongoose.model('sensor', new mongoose.Schema({
    id: String,
    sensor_name: String,
    sensor_description: String,
    lon: Number,
    lat: Number,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        }
    }
}));