// const Profile = require('../models/profile.js').Profile
// const cloudinary = require('cloudinary').v2

// function index(req, res) {
//   Profile.find({})
//   .then(profiles => res.json(profiles))
//   .catch(err => {
//     console.log(err)
//     res.status(500).json(err)
//   })
// }

// function addPhoto(req, res) {
//   const imageFile = req.files.photo.path
//   Profile.findById(req.params.id)
//   .then(profile => {
//     cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
//     .then(image => {
//       profile.photo = image.url
//       profile.save()
//       .then(profile => {
//         res.status(201).json(profile.photo)
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json(err)
//     })
//   })
// }

// module.exports = { index, addPhoto }
