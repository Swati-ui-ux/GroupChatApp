const Message = require("../../model/Message")

module.exports = (socket, io) => {
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
}