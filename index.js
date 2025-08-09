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
import Student from "./models/student.js"; // Importing the Student model   

const app = express();

app.use(bodyParser.json()); // This must code before other functions

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

app.get("/", (req, res) => {
  Student.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: "Failed to fetch students!",
        error: error.message,
      });
    });
});

app.delete("/", (req, res) => {
  res.json({
    message: "This is a DELETE request.",
  });
});

app.post("/", (req, res) => {
  console.log(req.body);

  //Student collection
  
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        stream: req.body.stream,
        email: req.body.email,
    });

    student
      .save()
      .then(() => {
        res.json({
          message: "Student added successfully!",
        });
      })
      .catch((error) => {
        res.json({
          message: "Failed to add Student!",
          error: error.message,
        });
      });

});

app.put("/", (req, res) => {
    res.json({
        message: "This is a PUT request.",
    });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
