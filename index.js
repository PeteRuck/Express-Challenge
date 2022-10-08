
const express = require("express");
const mongoose = require("mongoose");


const app = express();

const twitchRoutes = require('./routes/twitch');
const mongooseRoutes = require('./routes/mongoose');

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path)
    console.log(req.ip)
    console.log(new Date())
    next()
})

app.use('/twitch', twitchRoutes);
app.use('/mongoose', mongooseRoutes);


app.get("/error", (req, res, next) => {
    next(new Error("Custom Error"))
})

app.use((err, req, res, next) => {
    console.log(err)
    next(err)
})

app.use((err, req, res, next) => {
    res.status(500).send(err.stack)
    next(err)
})

mongoose.connect("mongodb://127.0.0.1:27017/dev").then(()=>{
    console.log("DB Connected")
}).catch(console.log)

const server = app.listen(3001, () => {
    console.log(server.address())
})