
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:String,
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account = mongoose.model('Account',accountSchema)

const userModel = mongoose.model("user",userSchema)