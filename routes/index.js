const express = require("express")
const bookTbl = require("../models/bookTbl")
const images = require("../multer/images")
const routes = express.Router()
const fs = require("fs")


routes.get('/',(req,res)=>{

    bookTbl.find({})
    .then((data)=>{
        
       return res.render("home",{
            data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})


routes.get('/form',(req,res)=>{
    
    res.render("form")
})


routes.post('/insertbook',images,(req,res)=>{

    const {title,author,price,description,category,limited} = req.body

    let image = req.file.path

    bookTbl.create({
        title,
        author,
        price,
        description,
        category,
        limited,
        image
    })
    .then((data)=>{
        console.log("Data addedd SuccessFully")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

    res.redirect("/")
})


routes.get("/delete/:id",(req,res)=>{
    const id = req.params.id

    bookTbl.findByIdAndDelete(id)
    .then((data)=>{
        console.log("Item deleted SuccessFully")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

    res.redirect("/")
})


routes.get(("/edit/:id"),(req,res)=>{

    const id = req.params.id

    bookTbl.findById(id)
    .then((data)=>{
        console.log("Update page")
        return res.render("edit",{
            data
        })
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

})

routes.post(("/updatebook"),images,(req,res)=>{

     const {id,title,author,price,description,category,limited} = req.body

     console.log(req.file)

    if(req.file){

        const image = req.file.path

        bookTbl.findById(id).then((oldRecord)=>{
            fs.unlinkSync(oldRecord.image)
        })
        .catch((err)=>{
            console.log(err)
            return false
        })

     bookTbl.findByIdAndUpdate(id,{
        title,
        author,
        price,
        description,
        category,
        limited,
        image

    })
    .then((data)=>{
        console.log("Update SuccessFully")
         res.redirect("/")
return false
      
    })
    .catch((err)=>{
        console.log(err)
        return false
    })
    }
else{

    bookTbl.findByIdAndUpdate(id,{
        title,
        author,
        price,
        description,
        category,
        limited

    })
    .then((data)=>{
        console.log("Update SuccessFully")
 
         res.redirect("/")
       return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

}
})



module.exports = routes;