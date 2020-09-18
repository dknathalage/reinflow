const mongoose = require('mongoose');
module.exports = mongoose.model('routes', new mongoose.Schema({
    id: String,
    user_name: String,
    auth: String,
    starting_point: Array,
    ending_point: Array,
    geometry: {
        coodinates: Object
    }
}));