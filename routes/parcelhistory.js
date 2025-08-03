const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ParcelHistory = require("../models/ParcelHistory");

/* get all parcel histories */
router.get("/parcelhistories", auth, async (req, res) => {
    try {
        const parcelhistories = await ParcelHistory.find();
        res.status(200).send(parcelhistories);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* get parcel history by id */
router.get("/parcelhistory/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const parcelhistory = await ParcelHistory.findById(id);
        res.status(200).send(parcelhistory);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* add a new parcel history */
router.post("/add", auth, async (req, res) => {
    const { parcel_id, user_id, status, amount, delivery_date, assigned_date, sender, receiver, longitude, latitude } = req.body;

    const existingParcelHistory = await ParcelHistory.findOne({ parcel_id });
    if (existingParcelHistory) {
        return res.status(400).send({ message: "Parcel history already exists" });
    }

    const parcelhistory = new ParcelHistory({ parcel_id, user_id, status, amount, delivery_date, assigned_date, sender, receiver, longitude, latitude });
    try {
        await parcelhistory.save();
        res.status(201).send({ parcelhistory: parcelhistory._id });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/* update parcel history by id */
router.put("/update-parcelhistory/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { agent_id } = req.body;

        const parcelhistory = await ParcelHistory.findById(id);
        parcelhistory.agent_id = agent_id;

        await parcelhistory.save();
        
        res.status(200).send(parcelhistory);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* delete parcel history by id */
router.delete("/delete-parcelhistory/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const parcelhistory = await ParcelHistory.findByIdAndDelete(id);
        res.status(200).send(parcelhistory);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;