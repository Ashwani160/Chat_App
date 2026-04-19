const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", ({ room, username }) => {
        socket.join(room);

        socket.to(room).emit("user_joined", {
            message: `${username} joined`,
        });

        console.log(`${username} joined ${room}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
export default initSocket;