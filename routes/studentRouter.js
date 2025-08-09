import express from "express";
import Student from "../models/student.js";
// import { get } from "mongoose";
import { saveStudent, getStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", getStudents);

studentRouter.post("/", saveStudent);

export default studentRouter;
