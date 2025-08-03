const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelSchema = new Schema({
    pickup_address: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    parcel_size: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    user_details: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Parcel = mongoose.model("parcel", parcelSchema);
module.exports = Parcel;