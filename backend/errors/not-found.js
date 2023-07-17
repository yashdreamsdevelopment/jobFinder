const CustomErrorAPI = require("./custom-error");

class NotFoundErrorAPI extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundErrorAPI;
