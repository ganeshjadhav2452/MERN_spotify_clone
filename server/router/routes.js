const express = require('express')

const router = express.Router();



router.get('/', (req, res) => {
    console.log('sldjfsd')
    res.send('sldjfsd')
})


module.exports = router;