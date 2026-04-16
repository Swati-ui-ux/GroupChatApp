const { Message } = require("../model");

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


module.exports = sendMessage;