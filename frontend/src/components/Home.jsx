import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Home = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load old messages
  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/message/all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to load messages:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    loadInitialMessages();
  }, [navigate]);

  // Socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    const handleMessage = (data) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        if (exists) return prev;
        return [...prev, data];
      });
    };

    socketRef.current.on("receive_message", handleMessage);

    return () => {
      socketRef.current.off("receive_message", handleMessage);
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socketRef.current.emit("send_message", { message: input });
    setInput("");
  }, [input]); // ✅ Fixed dependency

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-green-600 flex justify-between items-center text-white p-4">
        <div>Chat App</div>
        <button 
          onClick={handleLogout}
          className="hover:bg-green-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg p-3 shadow">
              <p className="text-gray-800">{msg.message}</p>
              {msg.createdAt && (
                <span className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 flex gap-2 bg-white border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type a message..."
        />
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 rounded-lg hover:bg-green-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;