const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    songId: { type: String, required: false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

exports.Playlist = Playlist;