
const User = require("../model/user")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
module.exports = (io) => {
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
       next()
   } catch (error) {
    return next(new Error("Authentication error"))  
   }
})


}