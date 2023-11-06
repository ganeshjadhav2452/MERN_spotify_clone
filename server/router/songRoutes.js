const express = require("express");
const router = express.Router();
const {
    createSong,
    getMySongs,
    getSongsOfArtist,
    getSongsByName,
} = require("../controllers/songControllers");
const passport = require("passport");

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    createSong
);

// get song routes
router.get(
    "/get/mysongs",
    passport.authenticate("jwt", { session: false }),
    getMySongs
);
router.get(
    "/get/by-artist/:artistId",
    passport.authenticate("jwt", { session: false }),
    getSongsOfArtist
);
router.get(
    "/get/by-name/:keyword",
    passport.authenticate("jwt", { session: false }),
    getSongsByName
);

module.exports = router;
