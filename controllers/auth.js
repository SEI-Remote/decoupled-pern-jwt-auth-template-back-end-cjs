const { User, Profile } = require('../models')
const jwt = require('jsonwebtoken')

async function signup(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) {
      throw new Error('Account already exists')
    } else if (!process.env.SECRET) {
      throw new Error('no SECRET in .env file')
    } else {
      const user = await User.create(req.body)
      req.body.userId = user.id
      const profile = await Profile.create(req.body)
      user.dataValues.profile = { id: profile.dataValues.id }
      const token = createJWT(user)
      res.status(200).json({ token })
    }
  } catch (error) {
    console.log(error);
    if (req.body.profile) {
      Profile.findByIdAndDelete(req.body.profile)
      res.status(500).json({ err: error.errmsg })
    } else if (error.message) {
      res.status(500).json({ err: error.message })
    } else {
      res.status(500).json({ err: error })
    }
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ 
      where: { email: req.body.email },
      include: { model: Profile, as: "profile", attributes: [ "id" ] }
    })
    if (!user) return res.status(401).json({ err: 'User not found' })
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user)
        res.json({ token })
      } else {
        res.status(401).json({ err: 'Incorrect password' })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) return res.status(401).json({ err: 'User not found' })
    user.comparePassword(req.body.pw, async (err, isMatch) => {
      if (isMatch) {
        user.password = req.body.newPw
        await user.save()
        const token = createJWT(user)
        res.json({ token })
      } else {
        res.status(401).json({ err: 'Incorrect password' })
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

// /* --== Helper Functions ==-- */

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
}

module.exports = { signup, login, changePassword }
