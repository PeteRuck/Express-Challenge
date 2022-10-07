const router = require("express").Router();
const {Schema, model} = require("mongoose");

const gamesSchema = new Schema({
    name:{type:String, required:true},
    genre:{type:String},
})

const streamerSchema = new Schema({
    userName:{type:String, required:true},
    job:{type:String, required:true},
    followers_K:{type:Number, required:true},
    games:[gamesSchema],
    twitter:{type:String}
})

const twitchModel = model("twitch", streamerSchema);

router.get("/getAll", (req, res, next) => {
    twitchModel.find({}).then(twitch => {
        res.status(200).json(twitch)
    }).catch(next)
})

router.get("/getById/:id", (req, res, next) => {
    twitchModel.find({"_id":req.params.id}).then(twitch => {
        res.status(200).json(twitch)
    }).catch(next)
})

router.get("/get", (req, res, next) => {
    twitchModel.find(req.body).then(twitch => {
        res.status(200).json(twitch)
    }).catch(next)
})

router.get("/getByUserName/:userName", (req, res, next) => {
    twitchModel.findOne({"userName": req.params.userName}).then(twitch =>{
            res.status(200).json(twitch)
        }).catch(next)
    })         
router.get("/getByGame/:games", (req, res, next) => {
    twitchModel.find({"games.name": req.params.name}).then(twitch =>{
            res.status(200).json(twitch)
        }).catch(next)
    })         

router.put("/create", (req, res, next) => {
    twitchModel.create(req.body).then(twitch => {
        res.status(201).json(twitch)
    }).catch(next)
})

router.post("/update/:id", (req, res, next) => {
    twitchModel.findByIdAndUpdate({"_id":req.params.id},req.body).then((Old) => {
        twitchModel.findById({"_id":req.params.id}).then((New) => {
            res.status(200).json({Old, New})
        })
    }).catch(next)
})

router.delete("/deleteOne/:id", (req, res, next) =>{
    twitchModel.findByIdAndDelete({"_id":req.params.id}).then(r=> {
        res.status(204).json(r)
    }).catch(r=>{
        res.status(404)
        res.send({ error: "Not in Database!" })
    })
})

router.delete("/deleteAll", (req, res, next) => {
    twitchModel.deleteMany({}).then(twitch => {
        res.status(200).json(twitch)
    }).catch(next)
})

module.exports = router;