const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const decodeUserFromToken = (req, res, next) => {
  let token = req.get('Authorization') || req.query.token || req.body.token
  if (!token) return next()

  token = token.replace('Bearer ', '')
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return next(err)

    req.user = decoded.user
    next()
  })
}

function checkAuth(req, res, next) {
  return req.user ? next() : res.status(401).json({ msg: 'Not Authorized' })
}

module.exports = { decodeUserFromToken, checkAuth }
