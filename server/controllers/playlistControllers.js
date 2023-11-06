const Playlist = require('../models/Playlist')
const Song = require('../models/Song')
const User = require('../models/User')

module.exports = {
    createPlaylistController: async (req, res) => {

        const { name, thumbnail, songId } = req.body;
        try {

            if (!name || !thumbnail) {
                return res.status(401).json({
                    success: false,
                    error: "please fill mandatory information "
                })
            }
            const playlist = await Playlist.create({
                name,
                thumbnail,
                owner: req.user._id,

            })
            // if user adding song with createplaylist req then we will push that songId to the playlist and save it

            if (songId) {
                playlist.songs.push(songId)
                await playlist.save()
            }

            return res.status(200).json({
                success: true,
                message: "playlist created",
                playlist
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while creating playlist"
            })
        }
    },
    getPlaylistsController: async (req, res) => {
        const { artistId } = req.params;
        try {
            const playlists = await Playlist.find({ owner: artistId }).select('_id name thumbnail')

            return res.status(200).json({
                success: true,
                message: "playlists fetched",
                playlists
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while fetching playlists"
            })
        }
    },
    getPlaylistSongs: async (req, res) => {
        const { playlistId } = req.params;
        try {
            const playlistInfo = await Playlist.findOne({ _id: playlistId, owner: req.user._id }).populate('songs')


            return res.status(200).json({
                success: true,
                message: "playlist song's fetched",
                songs: playlistInfo.songs
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while fetching playlists"
            })
        }
    },

    addSongToPlaylistController: async (req, res) => {
        const { songId, playlistId } = req.params;
        try {
            const playlistRes = await Playlist.findOne({ _id: playlistId }).populate(['owner', 'collaborators', 'songs']).select('owner collaborators songs')

            if (!playlistRes) {
                return res.status(304).json({
                    success: false,
                    error: 'Playlist does not exists'
                })
            }

            // checking is user owns this playlists or he/ she comes from team of collaborators to add song this playlist

            if (!playlistRes.owner._id === req.user._id && !playlistRes.collaborators.includes(req.user._id)) {
                return res.status(400).json({
                    success: false,
                    error: "Sorry only owner or collaborators of this playlist allowed to add songs "
                })
            } else {
                // find the song which needs to be added 
                const song = await Song.findOne({ _id: songId })

                if (playlistRes.songs.includes(songId)) {
                    return res.status(304).json({
                        success: false,
                        error: 'song already exists in playlist'
                    })
                }

                if (!song) {
                    return res.status(304).json({
                        success: false,
                        error: 'Song does not exists'
                    })
                }

                playlistRes.songs.push(songId)
                await playlistRes.save()
            }

            return res.status(200).json({
                success: true,
                message: 'song added to playlist',
                playlistRes
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while adding song to  playlist"
            })
        }
    },
    deleteSongFromPlaylistController: async (req, res) => {
        const { songId, playlistId } = req.params;
        try {
            const playlistRes = await Playlist.findOne({ _id: playlistId }).populate(['owner', 'collaborators', 'songs']).select('owner collaborators songs')

            // if (!playlistRes) {
            //     return res.status(304).json({
            //         success: false,
            //         error: 'Playlist does not exists'
            //     })
            // }

            // checking is user owns this playlists or he/ she comes from team of collaborators to delete song from playlist
            console.log('playlistRes', playlistRes)
            if (!playlistRes.owner == req.user._id && !playlistRes.collaborators.includes(req.user._id)) {
                return res.status(400).json({
                    success: false,
                    error: "Sorry only owner or collaborators of this playlist allowed to delete songs "
                })
            } else {
                // find the song which needs to be added 


                // if (!playlistRes.songs.includes(songId)) {
                //     return res.status(304).json({
                //         success: false,
                //         error: ' this song is not a part of this playlist'
                //     })
                // }


                let songToBeDeletedIndex = playlistRes.songs.indexOf(songId)
                playlistRes.songs.splice(songToBeDeletedIndex, 1)
                await playlistRes.save()
            }

            return res.status(200).json({
                success: true,
                message: 'song delete from playlist',
                playlistRes
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: "something went wrong while deleting song from  playlist"
            })
        }
    }
}