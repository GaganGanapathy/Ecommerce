const jwt = require("jsonwebtoken")
const User = require("../models/user_model")

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      res.status(401).json({ error: "User not logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        return res.status(402).json({ error: "User not logged in" })
      }
      const { _id } = payload
      const dbUser = await User.findById(_id)
      req.user = dbUser
      next()
    })
  } catch (err) {
    console.log("Error in protected route", err)
  }
}
