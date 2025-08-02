const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.log("MongoDB connection error:", err);
    });


/* routes setup */
const userRoute = require("./routes/user");

/* app setup */
const app = express();
const server = http.createServer(app);

/* middleware setup */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

/* routes setup */
app.use("/api/user", userRoute);

/* server setup */
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});