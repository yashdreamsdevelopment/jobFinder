require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connectDB");

const userRouter = require("./routes/user.route");
const jobRouter = require("./routes/jobs.route");

const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");
const authenticationMiddleware = require("./middleware/authentication");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jobs API");
});

app.get("/404", (req, res) => {
  res.status(200).send("<h1>404</h1> <h1>Page Not Found 👀</h1>");
});

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/jobs/", authenticationMiddleware, jobRouter);
// app.use("/mail", sendMail);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async (URI) => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => {
      console.log(`Server Listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("COULD'T START SERVER");
  }
};

startServer(process.env.MONGO_URI);
