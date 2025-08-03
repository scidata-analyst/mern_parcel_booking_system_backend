const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelHistorySchema = new Schema({
    parcel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Parcel'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    agent_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    delivery_date: {
        type: String,
        required: true
    },
    assigned_date: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ParcelHistory = mongoose.model("parcel_history", parcelHistorySchema);
module.exports = ParcelHistory;