const mongoose = require("mongoose")
const videoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    thumnail:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true,

    },
    views:{
        type:Number,
        default:0
    },
   likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
},{timestamps:true})
module.exports= mongoose.model("Video",videoSchema)