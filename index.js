const express = require('express');
const db = require('./config/db');
const bookSchema = require('./models/bookTbl');
const multer = require("multer")
const path = require("path")
const app = express()
const port = 3000

app.set("view engine" , "ejs")
app.use(express.json())
app.use(express.urlencoded())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))



app.use("/",require("./routes"))


app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }

    console.log("server is connected at port : " +port)
})