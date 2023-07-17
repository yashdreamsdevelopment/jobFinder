const { CustomErrorAPI } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res
      .status(err.statusCode)
      .send({ success: false, msg: err.message });
  }

  res.status(404).redirect("/404");
};

module.exports = errorHandlerMiddleware;
