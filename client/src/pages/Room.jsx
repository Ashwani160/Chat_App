import { useParams, useLocation, useNavigate } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox.jsx";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;

  if (!username) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <ChatBox room={roomId} username={username} />
    </div>
  );
};

export default Room;