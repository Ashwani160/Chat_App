import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    if (!username || !room) {
      alert("Enter username and room");
      return;
    }

    navigate(`/room/${room}`, {
      state: { username },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Realtime Chat</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Room ID"
        onChange={(e) => setRoom(e.target.value)}
      />

      <br /><br />

      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default Home;