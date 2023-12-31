const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photo: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number, 
    price: Number,
});

const  PlaceModel = mongoose.model('Place',placeSchema);

module.exports = PlaceModel;