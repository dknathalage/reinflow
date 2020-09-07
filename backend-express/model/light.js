const mongoose = require('mongoose');
module.exports = mongoose.model('light', new mongoose.Schema({
    id: String,
    light_name: String,
    light_description: String,
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