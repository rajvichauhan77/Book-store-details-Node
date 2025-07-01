const mongoose = require("mongoose")


const bookSchema  = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
})


const bookTbl = mongoose.model("data",bookSchema)

module.exports = bookTbl