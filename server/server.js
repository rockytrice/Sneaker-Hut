const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// db config
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db).then(() => console.log("🗄  MongoDB Connected"))
    .catch(err => console.log(err));

// middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Sever Setup
const PORT = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`🌎  Server listening on port ${PORT}`));