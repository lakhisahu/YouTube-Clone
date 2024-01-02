const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
var cookieParser = require('cookie-parser')
const auth = require("./routes/auth")
const app = express()
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(require("./routes/user"))
app.use(auth)
app.use(require("./routes/video"))
app.use(require("./routes/comment"))
dotenv.config()
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("conncted to mongodb");
}).catch((error)=>{
console.log(error);
})
app.listen(8000,()=>{
    console.log("success");
})