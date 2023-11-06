const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "song",
        },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
