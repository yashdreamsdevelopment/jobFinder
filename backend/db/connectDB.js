const { connect } = require("mongoose");

const connectDB = async (URI) => {
  try {
    await connect(URI);
    console.log("CONNECTED TO MONGODB");
    return;
  } catch (error) {
    console.log("COULD'T CONNECT TO MONGODB");
    console.log(error.message);
  }
};

module.exports = connectDB;
