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
 
const {Server} = require("socket.io");
const http = require("http")
const { Message, User } = require("./model")

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

io.use(async(socket,next) => {
   try {
    const token = socket.handshake.auth.token
     if (!token) {
        return next(new Error("Authentication error"))
       }
       const decoded = jwt.verify(token, process.env.SECRET_KEY)
       if (!decoded) {
           next(new Error("Invalid or expired token "))
       }
       const user = await User.findByPk(decoded.id)
       if(!user) {
        return next(new Error("User not found"))
       }
         socket.user = user
   } catch (error) {
    return next(new Error("Authentication error"))  
   }
    next()
})

io.on("connection", (socket) => {
    console.log("user is conected", socket.id)
    socket.on("send_message", async (data) => {
        try {
            console.log(socket.id,"Ids Name 💌💌",socket.user.name,"Message",data)
            const newMessage = await Message.create({
                message: data.message,
                userId: socket.user.id,
            })
             io.emit("receive_message", {
            id: newMessage.id,
            message: newMessage.message,
            userId: socket.user.id,
            userName: socket.user.name,
            createdAt: newMessage.createdAt
        });
        } catch (error) {
            console.error("Error creating message:", error)
        }
    
    });
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    });
    

})

server.listen(port, () => {
console.log("server is running ",port)
})

// 