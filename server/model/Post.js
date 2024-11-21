const mongoose = require('mongoose')
const MSchema = mongoose.Schema

const postSchema = new MSchema({
    comment: String,
    userID: Int
})

module.exports = mongoose.model('Post', postSchema)
