const express = require("express")

const app = express()
const port = 4000;
const db = require("./config/db")

require("./model/user")
const userRouter = require("./router/userRouter")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)

db.sync({ alter: true }).then(() => {
console.log("db ok")
}).catch(() => {
console.log("db error")
})
app.listen(port, () => {
console.log("server is running ",port)
})