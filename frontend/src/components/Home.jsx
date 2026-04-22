import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Home = () => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const currentUserId = localStorage.getItem("userId");

  /* ================= LOAD OLD MESSAGES ================= */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/message/all",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setMessages(data.messages || []);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
      }
    };

    fetchMessages();
  }, [navigate]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        if (exists) return prev;
        return [...prev, data];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socketRef.current.emit("send_message", {
      message: input,
    });

    setInput("");
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <div className="bg-green-600 text-white flex justify-between p-4">
        <h1>Chat App</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isMe = msg.userId == currentUserId;

          return (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-xs ${
                isMe
                  ? "bg-green-500 text-white ml-auto"
                  : "bg-white text-black mr-auto"
              }`}
            >
              <p>{msg.message}</p>

              {!isMe && (
                <p className="text-xs text-gray-500">{msg.userName}</p>
              )}

              <span className="text-xs">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <form onSubmit={sendMessage} className="p-3 flex gap-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type message..."
        />
        <button className="bg-green-500 text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;