//console.log("Hello, World!");

// import express from 'express';

// let app = express();

// function successFullyStarted() {
//     console.log("Server is running on port 3000");
// }

// app.listen(3000, successFullyStarted);

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import Student from "./models/student.js"; // Importing the Student model
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/useroute.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json()); // This must code before other functions

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", "");
    // console.log(token);

    jwt.verify(token, "cbc-batch-five#@2025", (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      }else{
        console.log("Invalid token!");
        res.status(403).json({
          message : "Invalid token"
        });
      }
    });
  }else{
    next();
  }

  // next();
});

//database connection
mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.dezpn9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the Database!");
  })
  .catch(() => {
    console.log("Failed to connect to the Database!");
  });

//-----------------------

app.use("/students", studentRouter); // Using the studentRouter for /students endpoint
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
