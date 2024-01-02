const express = require("express")
const User = require("../model/User")
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const app = express()
app.post("/signup", async (req, res) => {
   try {
      console.log(req.body)
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      const user = new User({ ...req.body, password: hash })
      await user.save()
      res.status(200).json("user created successfully")

   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
})
app.post("/login", async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
         res.status(404).send("user not found")
      }
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
         res.status(400).send("wrong credentials")
      }
      var token = jwt.sign({ id: user._id }, process.env.SECRETKEY);

      res.cookie("token", token, {
         httpOnly: true
      }).status(200).json(user)

   } catch (error) {
      res.status(500).send(error)
   }
})
module.exports = app