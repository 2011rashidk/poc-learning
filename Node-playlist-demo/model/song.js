const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    album: { type: String, required: true },
    artist: { type: String, required: true },
    path:  { type: String, required: true }
});

const Song = mongoose.model('Song', songSchema);

exports.Song = Song;