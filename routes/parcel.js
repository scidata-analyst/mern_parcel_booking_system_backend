const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Parcel = require("../models/Parcel");


/* get all parcels */
router.get("/parcels", auth, async (req, res) => {
    try {
        const parcels = await Parcel.find()
            .populate("user_details", "-password -__v")
            .populate({
                path: "history",
                populate: [
                    { path: "user", select: "-password -__v" },
                    { path: "agent", select: "-password -__v" }
                ]
            });
        res.status(200).send(parcels);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/* get parcel by id */
router.get("/parcel/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const parcel = await Parcel.findById(id);
        res.status(200).send(parcel);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* add a new parcel */
router.post("/add", auth, async (req, res) => {
    const { pickup_address, delivery_address, parcel_size, payment_method } = req.body;

    const parcel = new Parcel({
        pickup_address,
        delivery_address,
        parcel_size,
        payment_method,
        user_details: req.user,
    });

    try {
        await parcel.save();
        res.status(201).send({ parcel: parcel._id });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/* update parcel by id */
router.put("/update-parcel/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { pickup_address, delivery_address, parcel_size, payment_method } = req.body;

        const parcel = await Parcel.findById(id);
        parcel.pickup_address = pickup_address;
        parcel.delivery_address = delivery_address;
        parcel.parcel_size = parcel_size;
        parcel.payment_method = payment_method;

        await parcel.save();
        
        res.status(200).send(parcel);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* delete parcel by id */
router.delete("/delete-parcel/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const parcel = await Parcel.findByIdAndDelete(id);
        res.status(200).send(parcel);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
