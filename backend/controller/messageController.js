const { Message } = require("../model");
const { get } = require("../router/userRouter")

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

 
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

   
    const newMessage = await Message.create({
      message,
      userId,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Server error" });
  }
};

const getData = async (req, res) => {
    try {
        const userId = req.user.id;
      const messages = await Message.findAll({ where: { userId } });
      // console.log(messages)
        if (!messages) {
          res.status(404).json({ message: "error when get  message" });
        }
          res.status(200).json({ message: "success",messages });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}
module.exports = {sendMessage,getData};