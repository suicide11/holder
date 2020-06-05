require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
//My routes
const authRoutes = require("./routes/auth");
const holderRouter = require("./routes/holder");
const dbString = process.env.DATABASE ;
//DB Connection
mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/holder", holderRouter);
const port = process.env.PORT || 8000;

//Starting a server
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter)
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
