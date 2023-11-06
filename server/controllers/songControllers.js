const Song = require('../models/Song')
const User = require('../models/User')
module.exports = {
    createSong: async (req, res) => {
        const { name, thumbnail, track } = req.body;
        const artist = req.user._id;

        try {

            if (!name || !thumbnail || !track) {
                return res.status(301).json({
                    success: false,
                    error: "insufficient details to create song"
                })
            }
            const song = await Song.create({
                name,
                thumbnail,
                track,
                artist
            })

            return res.status(200).json({
                success: true,
                message: "song created ...",
                song
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while creating song"
            })
        }
    }

    ,
    getMySongs: async (req, res) => {
        const currentUser = req.user;
        try {
            const songs = await Song.find({ artist: req.user._id })

            return res.status(200).json({
                success: true,
                message: "songs fetched ...",
                songs
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while getting songs"
            })
        }
    },
    getSongsOfArtist: async (req, res) => {
        const { artistId } = req.params;
        try {
            // find artist 
            const isArtist = await User.findOne({ _id: artistId })
            if (!isArtist) {
                return res.status(301).json({
                    success: false,
                    error: "Arist Does Not Exists"
                })
            }

            // if isArtist returns artists user obj then we will feth he's / her songs

            const songs = await Song.find({ artist: artistId })

            return res.status(200).json({
                success: true,
                message: "songs fetched ...",
                songs
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while getting songs"
            })
        }
    }
    ,
    getSongsByName: async (req, res) => {
        const { keyword } = req.params;
        try {
            const songs = await Song.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } } //---> $options = not case sensitive

                ]
            },)

            return res.status(200).json({
                success: true,
                message: "songs fetched ...",
                songs
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while getting songs"
            })
        }
    }
}

