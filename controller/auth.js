const db = require("../models");
const User = db.UserModel;

async function checkLogin(usernameOrEmail, password) {
  const res = await User.findOne({
    $and: [
      { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
      { password: password },
    ],
  });
  return res;
}

async function checkValidSignup(username, email) {
  // Return -1 when username existed
  // -2 when email existed
  // 0 whenever valid params to signup
  let res = await User.find({ username: username });
  if (res.length > 0) {
    return -1;
  }
  res = await User.find({ email: email });
  if (res.length > 0) {
    return -2;
  }
  return 0;
}

async function createUser(params) {
  const { username, email, firstname, lastname, password } = params;
  const user = new User({
    username: username,
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password,
    roles: ["user"],
  });
  user.save();
}

module.exports = {
  checkLogin,
  checkValidSignup,
  createUser
};
