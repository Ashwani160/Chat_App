import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket]= useState<WebSocket | null>(null);
  const [message, setMessage]= useState<string>("");
  const [inputMessage, setInputMessage]=useState<string>("");

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !inputMessage.trim()) {
      return;
    }

    socket.send(inputMessage);
    setInputMessage("");
  };

  useEffect(()=>{
    const socket= new WebSocket('ws://localhost:8080');
    socket.onopen=()=>{
      console.log('WebSocket connection established');
      setSocket(socket);
    }
    socket.onmessage=(event)=>{
      console.log('Received message: ',event.data);
      setMessage((previousMessage) => previousMessage +" "+ event.data);
    }
    return ()=>{
      socket.close();
    }
  },[])
  if(!socket){
    return <div>
      loading...
    </div>
  }

  return (
    <>
      <input type='text' value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} ></input>
      <button onClick={sendMessage}>Send</button>
      <div>{message}</div>
    </>
  )
}

export default App
