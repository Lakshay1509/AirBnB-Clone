import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    },
    perks:{
        type: String,
        required: true,
        trim: true
    },
    extraInfo:{
       type: String,
        required: true,
        trim: true
    },
    checkIn:{
        type: String,
        required: true,
        trim: true
    },
    checkOut:{
        type: String,
        required: true,
        trim: true
    },
    maxGuests:{
        type: Number,
        required: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})

export const Place = mongoose.model('Place',placeSchema)