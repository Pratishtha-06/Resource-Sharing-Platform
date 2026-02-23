const mongoose = require('mongoose');

const PYQSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model("PYQ",PYQSchema);