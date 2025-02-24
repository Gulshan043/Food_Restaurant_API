const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const connectDB = require("./config/db");

// dot env configuration
dotenv.config();

//DB connection
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoute"));
// authentication routes
app.use("/api/v1/auth", require("./routes/authRoutes")); // user authentication
app.use("/api/v1/user", require("./routes/userRoutes")); // get users
app.use("/api/v1/resturant", require("./routes/resturantRoutes")); // resturant
app.use("/api/v1/category", require("./routes/categoryRoutes")); // category
app.use("/api/v1/food", require("./routes/foodsRoute")); // foods

app.get("/", (req, res) => {
  return res.status(200).send("<h1>hello world</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("app is running on http://localhost:3000");
});
