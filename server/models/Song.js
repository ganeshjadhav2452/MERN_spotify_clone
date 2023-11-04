const mongoose = require('mongoose')


const SongSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})


module.exports = mongoose.model('Song', SongSchema)