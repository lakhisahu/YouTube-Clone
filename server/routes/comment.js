const express = require("express")
const verifytoken= require("../verifytoken")
const Comment = require("../model/Comment")
const app = express()
app.post("/comment/addcomment",verifytoken,async (req,res)=>{
    try {
      const comment = new Comment({userId:req.user.id,...req.body})
      await comment.save()
      res.status(200).send("comment saved successfully")
    } catch (error) {
        res.status(403).send(error)
    }
})
app.get("/comment/get",verifytoken,async (req,res)=>{
    try {
      const comment = await Comment.find({videoId:req.query.id})
      console.log(comment);
      res.status(200).json(comment)
    } catch (error) {
      console.log(error);
        res.status(403).send(error)
    }
})

module.exports=app