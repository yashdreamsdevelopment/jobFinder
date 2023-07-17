const { UnAuthenticatedErrorAPI } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedErrorAPI("No Token Provided");
  }

  const token = authHeaders.split(" ")[1];

  if (!token || token === "null") {
    throw new UnAuthenticatedErrorAPI("No Token Provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const { userId, userName } = decoded;
    req.user = { userId, userName };

    return next();
  } catch (error) {
    throw new UnAuthenticatedErrorAPI("Un-Authorized Access");
  }
};

module.exports = authenticationMiddleware;
