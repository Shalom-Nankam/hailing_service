const db = require("./db");

const createUser = (socket) => {
  console.log("==========> creating user ============>");
  const { user_type } = socket.handshake.query;
  const generatedId = Math.floor(Math.random() * 1000000).toString();
  console.log("==========> generated id ============> " + generatedId);

  if (user_type === "user") {
    db.assignUser(generatedId, socket);
    sendEvent(socket, generatedId, "userCreated");
  } else {
    db.assignDriver(generatedId, socket);
    sendEvent(socket, generatedId, "driverCreated");
  }
};

const handleOrder = (order) => {
  console.log({ order });
};

function sendEvent(socket, data, eventname) {
  socket.emit(eventname, data);
}

module.exports = {
  createUser,
  handleOrder,
};
