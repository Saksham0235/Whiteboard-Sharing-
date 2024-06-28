const express = require("express");
const{addUser} =require('../utils/users')
const cors =require( "cors");

const app = express();
const port = process.env.PORT || 5000;
const server = require("http").createServer(app);

const { Server } = require("socket.io");
app.use(cors()); // Enable CORS for all routes


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on your frontend's origin
    methods: ["GET", "POST"]
  }
});


// Routes
app.get("/", (req, res) => {
  res.send(`<h1>This is realtime Whiteboard sharing app</h1>`);
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name,  userId,roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser(data);
// Sending data to frontend     
    socket.emit("userIsJoined", { success: true,users });
    socket.broadcast.to(roomId).emit("allUsers",users)
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });
  // It is for creating Live-Image of Presenter to the User's
  socket.on("whiteboardData", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: data,
    });
  });
});

server.listen(port, () => console.log(`Server is running on Port ${port}`));
