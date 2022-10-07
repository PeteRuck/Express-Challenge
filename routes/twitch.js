const router = require("express").Router();

var streamer = [{id:0, userName: "Khuby", job: "Driving instructor", followers_K: 4.5,
            games:["Construction Simulator", "Visage", "Broken"],
            twitter:"Khuby"}]
var id = 0;

router.get("/getAll", (req, res) => {
    res.status(200).json(streamer)
})

router.get("/getOne/:id", (req, res, next) => {

    for (const t of streamer) {
        if (t.id == req.params.id){
            res.status(200).json(t)
            return;
        }
    }
    next(new Error("Index invaild"))
})

router.get("/getOneByName/:userName", (req, res, next) => {
    for (const t of streamer) {
        if (t.userName === req.params.userName){
            res.status(200).json(t)
            return;
        }
    }
    next(new Error("Invaild name"))
})

router.delete("/deleteOne/:id", (req, res, next) => {
    try{
        streamer = streamer.filter(t => (t.id != req.params.id))
        res.status(200).json(streamer)
    }catch (err){
        next(new Error("Index invaild"))
    }
})

router.put("/create", (req, res, next) => {
    if (req.body.userName){
        req.body.id = ++id;
        streamer.push(req.body)
        res.status(201).json(req.body)
    }else{
        next(new Error('Expected {"userName":"{name}"}'))
    }
})

router.post("/update/:id", (req, res,next) => {

    const index = streamer.indexOf(streamer.find(t => t.id == req.params.id))

    if(index === -1){
        next(new Error('Invaild Index'))
    }else{
        streamer[index] = {...streamer[index], ...req.body}

        res.status(200).json(streamer[index])
    } 
})

router.patch("/updateAttribute/:id", (req, res, next)=> {
    if (req.query !== {}){

        const index = streamer.indexOf(streamer.find(t => t.id == req.params.id))

        if(index === -1){
            next(new Error('Invaild Index'))
        }else{
            for (const key of Object.keys(req.query)) {
                staff[index][key] = req.query[key]
            }
            res.status(200).json(streamer[index])
        }

    }else{
        next(new Error('Missing "/updateAttribute/:id?key=value"'))
    }
})

module.exports = router;