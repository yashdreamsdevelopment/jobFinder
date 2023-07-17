const CustomErrorAPI = require("./custom-error");
const NotFoundErrorAPI = require("./not-found");
const UnAuthenticatedErrorAPI = require("./unauthenticated");
const BadRequestErrorAPI = require("./bad-request");

module.exports = {
  CustomErrorAPI,
  NotFoundErrorAPI,
  UnAuthenticatedErrorAPI,
  BadRequestErrorAPI,
};
