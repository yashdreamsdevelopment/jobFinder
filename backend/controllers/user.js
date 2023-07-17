const User = require("../models/User");
const { UnAuthenticatedErrorAPI, BadRequestErrorAPI } = require("../errors");
const sendMail = require("../utility/sendMail");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const { name, email, token } = user;

    const isMailed = await sendMail(name, email, token);

    if (!isMailed) {
      throw new BadRequestErrorAPI("Mail server down, Please try again later");
    }

    return res.status(201).send({
      success: true,
      msg: "Account created successfully, Please verify you mail",
    });
  } catch (error) {
    return res
      .status(409)
      .send({ success: false, msg: "Email already in use" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // res.status(400).send({ success: false, msg: "Please provide credentials" });
    throw new BadRequestErrorAPI("Please provide credentials");
  }

  const user = await User.findOne({ email });

  if (!user) {
    // return res.status(401).send({ success: false, msg: "Invalid credentials" });
    throw new UnAuthenticatedErrorAPI("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new UnAuthenticatedErrorAPI("Email Not Verified");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    // res.status(401).send({ success: false, msg: "Invalid credentials" });
    throw new UnAuthenticatedErrorAPI("Invalid credentials");
  }

  const token = await user.createJWT();

  res.status(200).send({ success: true, token, msg: "logged in successfully" });
};

const verifyUserMail = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ token: id });
  console.log(user);

  if (!user) {
    return res.status(404).send("Not a valid user");
  }

  const verifiedUser = await User.findOneAndUpdate(
    { token: id, isVerified: false },
    { isVerified: true },
    { new: true }
  );

  if (!verifiedUser) {
    return res.status(404).send("<h1>Link Expired</h1>");
  }

  const token = await verifiedUser.createJWT();

  res
    .status(200)
    .redirect("http://localhost:5173/main")
    .json({ success: true, token, msg: "Account Verified" });
};

module.exports = { register, login, verifyUserMail };
