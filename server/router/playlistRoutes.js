const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createPlaylistController, getPlaylistSongs, getPlaylistsController, addSongToPlaylistController, deleteSongFromPlaylistController } = require('../controllers/playlistControllers.js')


//create playlist routes

router.post('/create', passport.authenticate('jwt', { session: false }), createPlaylistController)

// get routes for playlists

// get all playlists created by perticular artist
router.get('/get/:artistId', passport.authenticate('jwt', { session: false }), getPlaylistsController)

// get songs of perticular playlist
router.get('/get/songs/:playlistId', passport.authenticate('jwt', { session: false }), getPlaylistSongs)

// add song to playlist
router.post('/add/song/:songId/:playlistId', passport.authenticate('jwt', { session: false }), addSongToPlaylistController)

// delete song from playlist
router.delete('/delete/song/:songId/:playlistId', passport.authenticate('jwt', { session: false }), deleteSongFromPlaylistController)


module.exports = router;