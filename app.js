const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const homeRouter = require("./home/homeRouter");
const SocketHandler = require("./socketHandler");
const morgan = require("morgan");

const PORT = 6002;
const app = express();

app.use(morgan("dev"));
app.use(express.static("views"));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 1 * 60 * 1000,
  },
});

io.on("connection", (socket) => {
  SocketHandler.createUser(socket);

  socket.on("requestOrder", (order) => SocketHandler.handleOrder(order));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

// app.post("/home", homeRouter);

app.post("/home/user", (req, res) => {
  res.sendFile(__dirname + "/views/commo.html");
});

app.post("/home/driver", (req, res) => {
  res.sendFile(__dirname + "/views/driver.html");
});

app.post("*", (req, res) => {
  res.status(404).json({ success: true, message: "Path not found" });
});

app.listen(PORT, () => {
  console.log(`server started successfully..`);
});
