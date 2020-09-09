const mongoose = require('mongoose');
module.exports = mongoose.model('light', new mongoose.Schema({
    id: String,
    light_name: String,
    light_description: String,
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