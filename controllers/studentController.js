import Student from "../models/student.js";

export function getStudents(req,res){
Student.find()
.then((data) => {
    res.json(data);
  })
}

export function saveStudent(req, res) {
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

}