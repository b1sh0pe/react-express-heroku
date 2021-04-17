const express = require("express");

const router = express.Router();

router.use("/article", require("./article"));

router.get("*", function (req, res) {
  const message = "No service found";
  const statusCode = 404;

  res.status(statusCode);
  res.send({
    status: statusCode,
    message: message,
    type: "request"
  });
});

module.exports = router;