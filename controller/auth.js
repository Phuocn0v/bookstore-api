const db = require('../models')
const User = db.UserModel
const passwordCryptor = require('../helper/passwordCryptor')

async function checkLogin (usernameOrEmail, password) {
  // Return -1 when username or email not existed
  // -2 when password not match
  // user object whenever valid params to login
  const res = await User.findOne({
    $and: [
      { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
    ]
  })
  if (!res) { return -1 }
  const isValid = passwordCryptor.compare(password, res.password)
  if (!isValid) { return -2 }
  return res
}

async function checkValidSignup (username, email) {
  // Return -1 when username existed
  // -2 when email existed
  // 0 whenever valid params to signup
  let res = await User.find({ username })
  if (res.length > 0) {
    return -1
  }
  res = await User.find({ email })
  if (res.length > 0) {
    return -2
  }
  return 0
}

async function createUser (params) {
  const { username, email, firstname, lastname, password } = params
  const hash = passwordCryptor.encrypt(password)

  const user = new User({
    username,
    email,
    firstname,
    lastname,
    password: hash,
    roles: ['user']
  })
  user.save()
}

module.exports = {
  checkLogin,
  checkValidSignup,
  createUser
}
