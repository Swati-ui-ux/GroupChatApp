const express = require("express")
const { postUser, loginUser } = require("../controller/userController")


const router = express.Router()

router.post("/signup", postUser)
router.post("/login",loginUser)

module.exports = router