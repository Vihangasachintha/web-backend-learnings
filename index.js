//console.log("Hello, World!");

// import express from 'express';

// let app = express();

// function successFullyStarted() {
//     console.log("Server is running on port 3000");
// }

// app.listen(3000, successFullyStarted);

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "This is a GET request.",
  });
});

app.delete("/", (req, res) => {
  res.json({
    message: "This is a DELETE request.",
  });
});

app.post("/", (req, res) => {
    res.json({
        message: "This is a POST request.",
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
