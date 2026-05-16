const express = require("express")
const app = express()
const PORT = 5000

app.get("/", (req, res) => {
    res.send("helloo world")
})

const usersignup = require('./routes/authroutes')


app.use('/api/auth', usersignup)

app.listen(PORT, () => {
    console.log("server is running at 5000 ")
})