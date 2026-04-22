const express = require("express")
const app = express()
const port = 4000;
const jwt = require("jsonwebtoken")
// db
const db = require("./config/db")
require("./model")
require('./model/message')
// routes 
const userRouter = require("./router/userRouter")
const messageRouter = require("./router/messageRoute")
const authMiddleware = require("./middleware/authMiddleware")
const cors = require("cors")
 

const http = require("http")
const { Message, User } = require("./model")

const server = http.createServer(app)
const socketIO = require("./socket_io")

 socketIO(server)



// middleware
{app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use("/message", authMiddleware, messageRouter)}


db.sync({ alter: true })
    .then(() =>console.log("db ok"))
    .catch(() => console.log("db error"))


server.listen(port, () => {
console.log("server is running ",port)
})
