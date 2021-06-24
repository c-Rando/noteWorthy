const router = require('express').Router();
// calls express.Router() package from within the express module
const store = require("../db/store");

// create a route to that responds with all notes coming fron database

router.route('/notes')
    // [GET] /api/notes
    .get(async (req, res) => {
        try {
            const notes = await store.getNotes();
            return res.json(notes);
        } catch (err) {
            res.status(500).json(err);
        };
    })
    // [POST] /api/notes
    .post(async (req, res) => {
        try {
            const body = req.body;
            const resp = await store.createNote(body);
            return res.json({ message: resp });
        } catch (err) {
            res.status(500).json(err);
        };
    });

router.route('/notes/:id')
    .get(async (req, res) => {
        try {
            const noteId = req.params.id;
            const note = await store.getNote(noteId);
            console.log(note);
            return res.json(note);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        };
    });



module.exports = router;