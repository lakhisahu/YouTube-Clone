const express = require("express")
const verifytoken= require("../verifytoken")
const User = require("../model/User")
const app = express()
app.post("/user/edit" , verifytoken,async (req,res)=>{
    try {
        if(req.body.id == req.user.id){
            const user = await User.findByIdAndUpdate(req.body.id,{
                $set:req.body
            },{
                new:true
            })
            res .status(200).json(user)
        }else{
            res.status(403).send("you can update only your account")
        }
        
    } catch (error) {
        res.status(403).json(error)
    }
   
})
app.get("/user/get",async(req,res)=>{
    try {
       const user = await User.findById(req.query.id)
       res.status(200).json(user)
    } catch (error) {
        res.status(403).json(error)
    }
    })
app.post("/user/delete", verifytoken,async(req,res)=>{
    try {
        if(req.body.id == req.user.id){
            await User.findByIdAndDelete(req.body.id)
            res .status(200).send("user has been deleted")
        }else{
            res.status(403).send("you can delete your account")
        } 
    } catch (error) {
       res.status(403).json(error) 
    }
    
})
app.post("/user/subscribe", verifytoken,async(req,res)=>{
    try {
         await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.body.id}
         })
         await User.findByIdAndUpdate(req.body.id,{
            $inc:{subscribers:1}
         }) 
         res.status(200).send("subcription successfull")  
    } catch (error) {
        console.log(error);
        res.status(403).json(error)  
    }
})
app.post("/user/unsubscribe", verifytoken,async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
           $pull:{subscribedUsers:req.body.id}
        })
        await User.findByIdAndUpdate(req.body.id,{
           $int:{subscribers:-1}
        }) 
        res.status(200).send("unsubcription successfull")  
   } catch (error) {
       res.status(403).json(error)  
   }
})
app.post("/user/like",async(req,res)=>{
    try {
        await Video.findByIdAndUpdate(req.body.id,{
           $addToSet:{likes:req.body.userId},
        
        })
       
        res.status(200).send("video has been liked")  
   } catch (error) {
       res.status(403).json(error)  
   }
})


module.exports=app