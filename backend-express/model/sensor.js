const mongoose = require('mongoose');
module.exports = mongoose.model('sensor', new mongoose.Schema({
    id:String,
    location: {
        type:{
            type: String,
            enum:['Point'],
            required: true
        },
        coordinates: {
            type:[Number],
            required:true
        }
    }
}));