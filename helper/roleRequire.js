const jwt = require('jsonwebtoken')

const roleRequire = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ msg: 'Forbidden' })
    } else {
      req.user = user
      next()
    }
  })
}

const roleRequireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ msg: 'Forbidden' })
    } else {
      req.user = user
      if (req.user.roles.indexOf('admin') === -1) res.status(403).json({ msg: 'Forbidden' })
      next()
    }
  })
}

module.exports = {
  roleRequire,
  roleRequireAdmin
}
