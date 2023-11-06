const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    likedSongs: {

        type: String,
        default: ''
    },
    likedPlaylists: {

        type: String,
        default: ''
    },
    subscribedArtists: {

        type: String,
        default: ''
    },
})


module.exports = mongoose.model('User', UserSchema)