const CustomErrorAPI = require("./custom-error");

class UnAuthenticatedErrorAPI extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthenticatedErrorAPI;
