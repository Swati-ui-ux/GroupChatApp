const Message = require("../../model/Message")

module.exports = (socket, io) => {
console.log("user is conected", socket.id)
       
            socket.on("join_room", (roomName) => {
                socket.join(roomName)
            })
            
    socket.on("new_message", async ({message,roomName}) => {
        console.log("User ", socket.user.username, "said", message);
        
        io.emit("new_message", {
            username: socket.user.name, message
        });
        
        
       
           
     
    
    });
   
}