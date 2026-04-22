const { Message } = require("../model");
const { get } = require("../router/userRouter")


let clients = [];
const getData = async (req, res) => {
  try {
      const client={res}
      clients.push(client);
      client.timeout=setTimeout(() => {
        res.json({ messages: [] })
        clients = clients.filter(c => c !== client);
        
      }, 30000)
      console.log("Time is out 3minute")
       
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}


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
    
    clients.forEach((client) => {
      clearTimeout(client.timeout)
      client.res.json({ messages: [newMessage] });
      
    });
    clients=[];
    res.status(201).json({
      message: newMessage,
    });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Server error" });
  }
};

const getAllMessage = async (req, res) => {
try {
  const messages = await Message.findAll({
  order:[['createdAt',"ASC"]]
  })
  res.status(200).json({messages})
  
} catch (error) {
  console.log(error)
  res.status(500).json({message:"Server Error "})
  
}
}



module.exports = { sendMessage, getData, getAllMessage }

