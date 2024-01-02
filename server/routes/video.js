const express = require("express")
const verifytoken = require("../verifytoken")
const Video = require("../model/Video")
const app = express()
app.post("/addvideo", verifytoken, async (req, res) => {
    try {
        const video = new Video({ userId: req.user.id, ...req.body })
        await video.save()
        res.status(200).send("video uploaded successfully")
    } catch (error) {
        res.status(403).send(error)
    }
})
app.post("/video/edit", verifytoken, async (req, res) => {
    try {
        const video = await Vedio.findById(req.body.id)
        if (!video) {
            return res.status(404).send("video not found")
        }
        if (req.user.id == req.video.userId) {
            const video1 = await Video.findByIdAndUpdate(req.body.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(video1)
        } else {
            res.status(403).send("you can update only your account")
        };

    } catch (error) {
        res.status(403).json(error)
    }

})
app.post("/video/delete", verifytoken, async (req, res) => {
    try {
        const video = await Vedio.findById(req.body.id)
        if (!video) {
            return res.status(404).send("video not found")
        }
        if (video.userId == req.user.id) {
            await Video.findByIdAndDelete(req.body.id)
            res.status(200).send("video has been deleted")
        } else {
            res.status(403).send("you can delete your video")
        }
    } catch (error) {
        res.status(403).json(error)
    }

})
app.get("/video/get", async (req, res) => {
    try {
       // console.log(req.query);
        const video = await Video.findById(req.query.id)
       // console.log(video);
        res.status(200).json(video)
    } catch (error) {
        res.status(403).json(error)
    }
})
app.post("/video/addviews", async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.body.id, {
            $int: { views: 1 }
        })
        res.status(200).send("video views has been increase")
    } catch (error) {
        res.status(403).json(error)
    }
})
app.get("/video/random", async (req, res) => {
    try {
        const video = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(video)
    } catch (error) {
        res.status(403).json(error)
    }
})
app.post("/video/trending", async (req, res) => {
    try {
        const video = await Video.find().sort({views:-1})
        res.status(200).json(video)
    } catch (error) {
        res.status(403).json(error)
    }
})
app.post("/video/search", async (req, res) => {
    try {
        const video = await Video.find({title:{$regex:req.body.title,$option:"i"}}).limit(40)
        res.status(200).json(video)
    } catch (error) {
        res.status(403).json(error)
    }
})
module.exports=app