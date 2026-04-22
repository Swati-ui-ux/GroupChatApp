const express = require("express")
const app = express()
const port = 4000;
// db
const db = require("./config/db")
require("./model")
require('./model/message')
// routes 
const userRouter = require("./router/userRouter")
const messageRouter = require("./router/messageRoute")
const authMiddleware = require("./middleware/authMiddleware")
const cors = require("cors")
 
const {Server} = require("socket.io");
const http = require("http")
const { Message } = require("./model")

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
    origin:"*",
    }
})





// middleware
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use("/message", authMiddleware, messageRouter)


db.sync({ alter: true })
    .then(() =>console.log("db ok"))
    .catch(() => console.log("db error"))

io.on("connection", (socket) => {
    console.log("user is conected", socket.id)
    socket.on("send_message", async (data) => {
        try {
            const newMessage = await Message.create({
                message: data.message,
                userId: data.userId,
            })
            io.emit("receive_message",newMessage)
        } catch (error) {
            console.error("Error creating message:", error)
        }
        console.log("Message", data)
        io.emit("receive_message", data)
    });
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    });
    

})

server.listen(port, () => {
console.log("server is running ",port)
})

// 