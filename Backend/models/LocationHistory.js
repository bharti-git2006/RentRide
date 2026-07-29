import mongoose from "mongoose";

const locationHistorySchema = new mongoose.Schema({

    trip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trip",
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    speed:{
        type:Number,
        default:30
    },

    timestamp:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model(
    "LocationHistory",
    locationHistorySchema
);