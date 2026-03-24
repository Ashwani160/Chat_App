import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
app.use(express.json());

// HTTP route
app.get("/", (_req, res) => {
  res.send("HTTP is working");
});

// Start Express (returns HTTP server)
const server = app.listen(8080, () => {
  console.log("HTTP server running on http://localhost:8080");
});

// Attach WebSocket to Express server
const wss = new WebSocketServer({ server });


let userCount=0;
wss.on('connection', function connection(ws) {
    userCount++;
    console.log(`User Count: ${userCount}`);
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('something');
});