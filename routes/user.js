const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/* register a new user */
router.post("/add", async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
    }

    const user = new User({ name, email, phone, password, role });
    try {
        await user.save();
        res.status(201).send({ user: user._id });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/* login a user */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
        const token = jwt.sign({ user: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ user, token });
    } else {
        res.status(400).send({ message: "Invalid credentials" });
    }
});


/* get all users */
router.get("/all", auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* get user by id */
router.get("/profile/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


/* update user by id */
router.put("/update-profile/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, password } = req.body;

        const user = await User.findById(id);
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.role = role;
        user.password = password;

        await user.save();
        
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

/* verify token */
router.get('/verify-token', auth, (req, res) => {
    res.status(200).json({ message: 'okay', user: req.user });
});


module.exports = router;