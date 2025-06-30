const multer = require("multer")


const newImage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
    
})




const images = multer({storage:newImage}).single("image")

module.exports = images