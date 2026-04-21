import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ChatUI = () => {
  const navigate = useNavigate();

 
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getMessages = async () => {
    console.log("I am  running")
    try {
    let {data } = await axios
        .get("http://localhost:4000/message", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
      setMessages(data.messages);
      console.log(data.messages)
    } catch (error) {
      console.log(error)
    }
  };  
  useEffect(() => {
setInterval(getMessages,5000)
  }, []);
  const sendMessage = async(e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
     let data =  await axios
        .post("http://localhost:4000/message",{message:input}, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
      console.log("data post",data)
    } catch (error) {
      console.log(error)
    }
    
    setInput("");
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Header */}
      <div className="bg-green-600 flex justify-between items-center text-white p-4 font-semibold text-lg">
        <div>Chat App</div>
        <button
          onClick={handleLogout}
          className="hover:border px-4 rounded-2xl cursor-pointer shadow"
        >
          Log out
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
          >
            <h1>{msg.message}</h1>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-white flex gap-2 border-t"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;