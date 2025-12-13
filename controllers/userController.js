import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export function createUser(req, res) {
  if (req.body.role == "admin") {
    if (req.user != null) {
      if (req.user.role != "admin") {
        res.status(403).json({
          message: "You are not authorized to create an admin accounts!",
        });
      }
      return;
    } else {
      res.status(403).json({
        message:
          "You are not authorized to create an admin accounts! Please login first",
      });
      return;
    }
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  user
    .save()
    .then(() => {
      res.json({ message: "User created successfully!" });
    })
    .catch((error) => {
      res.json({ error: "Failed to create user!" });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "User not found!",
      });
    } else {
      const isPassswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPassswordCorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            img: user.img,
          },
          process.env.JWT_KEY
        );

        res.json({
          message: "Login successful!",
          token: token,
          role: user.role,
        });
      } else {
        res.status(401).json({
          message: "Invalid password!",
        });
      }
    }
  });
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }
  if (req.user.role != "admin") {
    return false;
  }
  return true;
}

// email:{
//     type:String,
//     required:true,
//     unique:true
//     },
//     firstName:{
//         type:String,
//         required:true
//     },
//     lastName:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         required:true,
//         default:"customer"
//     },
//     isBlocked:{
//         type:Boolean,
//         required:true,
//         default:false
//     },
//     img:{
//         type:String,
//         required:false,
//         default:"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=39d859c6-6b9c-4a18-9574-91b8f24aa0fb&query=Default+User"
//     }

export async function loginWithGoogle(req, res) {
  try {
    const token = req.body.accessToken;
    if (token == null) {
      res.status(400).json({ message: "Access token is required" });
      return;
    }

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    let user = await User.findOne({ email: response.data.email });
    if (user == null) {
      user = new User({
        email: response.data.email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        password: bcrypt.hashSync("googleUser", 10),
        img: response.data.picture,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        img: user.img,
      },
      process.env.JWT_KEY
    );

    res.json({
      message: "Login successful!",
      token: jwtToken,
      role: user.role,
    });
  } catch (error) {
    console.error("Google login failed", error);
    res.status(500).json({ message: "Failed to login with Google" });
  }
}
