// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// Import routes
const userRoutes = require("./routes/userRoutes.js");
const storyRoutes = require("./routes/storyRoutes.js");

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: "https://swip-tory-frontend-nu.vercel.app",
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);

//DB Server

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      //useNewUrlParser: true,         // These methods have now no effect in Node.js Driver version 4.0.0
      //useUnifiedTopology: true,      // These methods have now no effect in Node.js Driver version 4.0.0
    })
    .then(() => {
      console.log("MongoDB Connected");
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    })
    .catch((error) => {
      console.log(error);
    });
});
