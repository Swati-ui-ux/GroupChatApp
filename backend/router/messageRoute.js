const express = require("express")
const {sendMessage,getData,getAllMessage} = require("../controller/messageController")

const router = express.Router()

router.post("/", sendMessage)
router.get("/", getData)
router.get("/all", getAllMessage)
module.exports = router