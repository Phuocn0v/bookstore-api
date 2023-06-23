const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;
  AuthController.checkLogin(usernameOrEmail, password).then((user) => {
    if (user === null) {
      res.status(401).json({ msg: "Username or password is incorrect!" });
    } else {
      const access_token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          roles: JSON.stringify(user.roles),
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ access_token });
    }
  });
});

router.post("/signup", (req, res, next) => {
  const { username, email, firstname, lastname, password } = req.body;
  AuthController.checkValidSignup(username, email).then((validStatus) => {
    if (validStatus === -1)
      res.status(409).json({ msg: "Username is already taken" });
    if (validStatus === -2)
      res.status(409).json({ msg: "Email is already taken" });
    if (validStatus === 0) {
      AuthController.createUser({
        username,
        email,
        firstname,
        lastname,
        password,
      }).then(() => {
        res.status(200).json({ msg: "Signup success!" });
      });
    }
  });
});

module.exports = router;
