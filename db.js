let usersDb = [];

let driversDb = [];

const assignUser = (id, socket) => {
  console.log("==========> assigning user ============>");

  const userObj = new Map();

  userObj.set(id, socket);

  console.log({ userObj });

  usersDb.push(userObj);

  console.log("==========> user db length ============> " + usersDb.length);
};

const assignDriver = (id, socket) => {
  const driverObj = new Map();

  driverObj.set(id, socket);

  driversDb.push(driverObj);
};

module.exports = {
  assignUser,
  assignDriver,
};
