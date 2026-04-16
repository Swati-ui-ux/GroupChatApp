import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatUI = () => {
  const navigate = useNavigate();

  const initialData = [
    { id: 1, text: "Hey Swati", sender: "other", time: "10:00 AM" },
    { id: 2, text: "Hello! Kaise ho?", sender: "me", time: "10:01 AM" },
  ];

  const [messages, setMessages] = useState(initialData);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      // ✅ backend ko correct data bhejo
      await axios.post("http://localhost:4000/message", {
        message: input,
      }, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-2xl shadow text-sm ${
                msg.sender === "me"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] mt-1 text-right opacity-70">
                {msg.time}
              </p>
            </div>
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