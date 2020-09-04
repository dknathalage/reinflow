const mongoose = require('mongoose');
module.exports = mongoose.model('sensor', new mongoose.Schema({
    id: String,
    sensor_name: String,
    sensor_description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}));