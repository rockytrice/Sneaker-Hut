const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const passport = require("passport");

const users = require("./routes/api/users");
const products = require("./routes/api/product");
const brands = require("./routes/api/brands");

// db config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db).then(() => console.log("🗄  MongoDB Connected"))
    .catch(err => console.log(err));

// middleware
// 🤦🏾‍♂️remember the order in which you declare routes/middleware!!! if the routes are declared before the bodyparser middleware (which is used to populate req.body), body-parser won't get called for request starting with /api 😅
// <=============parse incoming request into json=======================>
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// <=============middleware (morgan-logging framwork)==================>
app.use(morgan("combined"));
app.use(cors());


// <============== Use Routes ================>
app.use("/api/users", users)
app.use("/api/products", products)
app.use("/api/products", brands)


// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);





// Sever Setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`🌎  Server listening on port ${PORT}`));