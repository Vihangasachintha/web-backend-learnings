import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    name: String,
    age: Number,
    stream: String,
    email: String,
  });

  const Student = mongoose.model("students", StudentSchema);
  
  export default Student; //