import { useParams, useLocation, useNavigate } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox.jsx";
import { useEffect } from "react";
import { useState } from "react";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username=location.state?.username;

  const checkUser=()=>{
    if (!username) {
      navigate("/");
    }
  }
  useEffect(()=>{

    checkUser();

  },[])

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <ChatBox room={roomId} username={username} />
    </div>
  );
};

export default Room;