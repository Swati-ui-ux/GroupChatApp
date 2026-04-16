const express = require("express")
const {sendMessage,getData} = require("../controller/messageController")

const router = express.Router()

router.post("/", sendMessage)
router.get("/",getData)
module.exports = router