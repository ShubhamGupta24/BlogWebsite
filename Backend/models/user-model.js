const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Define the User Resgister schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// During Password Hashing:  
// The pre middleware is defined within the userSchema before creating the User model.
// This ensures that the middleware is properly applied to user documents before they are saved to th e database.
userSchema.pre("save", async function () {
  const user = this;
  console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    //? secure the password with the bcrypt
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});




//? Generate JSON Web Token
userSchema.methods.generateToken = async function () {
  console.log("I am token");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "3d",
      }
    );

  } catch (error) {
    console.error("Token Error: ", error);
  }
};


// instance method to compare hashed password and entered password

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

// define the model or the collection name
const User = new mongoose.model("USER", userSchema);
module.exports = User