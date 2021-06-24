const path = require('path');
const router = require('express').Router();


// [GET] /notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// all other routes will return with index file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;