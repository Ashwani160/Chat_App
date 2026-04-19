import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket/socket.js";

const ChatBox = ({ room, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinedRef = useRef(false);

  useEffect(() => {
    if (!joinedRef.current) {
      socket.connect();
      socket.emit("join_room", { room, username });
      joinedRef.current = true;
    }

    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleJoin = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);
    socket.on("user_joined", handleJoin);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("user_joined", handleJoin);
    };
  }, [room, username]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      room,
      author: username,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.author || "System"}:</b> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%" }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;