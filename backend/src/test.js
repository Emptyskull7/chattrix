const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    test_id:{
        type:String,
        required:true,
        unique:true,        
    },
});

const Test = mongoose.model("Test", testSchema);

const mongoose = require("mongoose");

const role = new mongoose.Schema({
    admin:{
        type:Boolean,
        default:false,
    },
    user:{
        type:Boolean,
        default:true,
    },
    superAdmin:{
        type:Boolean,
        default:false,
    }
});

const Role = mongoose.model("Role", role);