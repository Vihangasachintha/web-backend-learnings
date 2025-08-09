import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
    type:String,
    required:true,
    unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"customer"
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    },
    img:{
        type:String,
        required:false,
        default:"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=39d859c6-6b9c-4a18-9574-91b8f24aa0fb&query=Default+User"
    }

});

const User = mongoose.model("users",userSchema);

export default User;