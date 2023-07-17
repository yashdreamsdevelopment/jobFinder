const { Schema, model, SchemaTypes } = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name must be greater than 3 characters"],
      maxlength: [50, "Name should be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    token: {
      type: SchemaTypes.UUID,
      default: () => uuidV4(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.SECRET_TOKEN,
    { expiresIn: process.env.SECRET_TOKEN_LIFESPAN }
  );
};

// UserSchema.methods.verify = function () {
//   console.log(this.isVerified);
//   this.isVerified = "hello";

//   return true;
// };

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bycrypt.compare(canditatePassword, this.password);
//   return isMatch;
// };

UserSchema.method("comparePassword", async function (canditatePassword) {
  const isMatch = await bycrypt.compare(canditatePassword, this.password);
  return isMatch;
});

module.exports = model("User", UserSchema);
