
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:String,
});

const userModel = mongoose.model("user",userSchema)