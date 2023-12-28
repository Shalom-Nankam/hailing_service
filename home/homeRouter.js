const express = require("express");

const router = express.Router();

router.post("/user", (req, res) => {
  res.sendFile(__dirname + "/views/user.html");
});

router.post("/driver", (req, res) => {
  res.sendFile(__dirname + "/views/driver.html");
});

module.exports = router;
