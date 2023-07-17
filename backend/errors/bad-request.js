const CustomErrorAPI = require("./custom-error");

class BadRequestErrorAPI extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestErrorAPI;
