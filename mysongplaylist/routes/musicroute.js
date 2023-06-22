const multer = require('multer');
const { User } = require('../model/user');
const { Playlist } = require('../model/playlist');
const { Song } = require('../model/song');
const express = require('express');
const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Routes for user sign up
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Routes for login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // user.then((u1) => {
        //     console.log(u1)
        // })
        console.log('user-->', user);
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        if(user.password != password) {
            res.status(401).json({ error: 'Wrong password!' });
        } else {
            res.json({ message: 'Login successful' });
        }
        // Perform password validation here, e.g., using bcrypt
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});


// Create playlist
router.post('/playlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, genre } = req.body;
        const playlist = await Playlist.create({ name, genre, user: userId });
        res.json({ message: 'Playlist created successfully', playlist });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create playlist' });
    }
});


// Get all playlist of a user
router.get('/playlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const playlists = await Playlist.find({ user: userId });
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve playlists' });
    }
});

// Add song
router.post('/playlist/song', async (req, res) => {
    try {
        const { title, album, artist } = req.body;
        const song = await Song.create({ title, album, artist });
        res.json({ message: 'Playlist created successfully', song });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create playlist' });
    }
});

// router.post('/playlist/song', upload.single('audio'), async (req, res) => {
//     try {
//         const { title, album, artist } = req.body;
//         const song = {
//             title,
//             album,
//             artist,
//             audio: req.file.path,
//         };

//         if (Array.isArray(playlist.songs)) {
//             playlist.songs.push(song);
//         } else {
//             playlist.songs = [song];
//         }


//         const song = await Song.create({ title, album, artist });
//         res.json({ message: 'Playlist created successfully', song });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create playlist' });
//     }
// });


// Add a song to a playlist
router.post('/playlist/song/:playlistId', upload.single('audio'), async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { title, album, artist, songId } = req.body;
        const song = {
            title,
            album,
            artist,
            audio: req.file.path,
        };

        const playlist = Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (Array.isArray(playlist.songs)) {
            playlist.songs.push(song);
        } else {
            playlist.songs = [song];
        }

        // await song.save;
        const playlistUpdate = await Playlist.updateOne({  _id: playlistId }, { $set: { songId: songId } });
        res.status(201).json({ message: 'Song added to playlist' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding song to playlist' });
    }
});

// Get song in a playlist
router.get('/playlist/song/:playlistId', async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findById(playlistId);
        
        const song = await Song.findById(playlist.songId);
        console.log(song);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const songs = playlist.songId;
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ message: 'Error retreiving songs!' });
    }
});

// Delete a song from a playlist
router.delete('/playlist/:playlistId/song/:songId', async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // const songIndex = playlist.songs.findIndex(song => song._id.toString() === songId);

        // Object.values(dels)
        // if (songIndex === -1) {
        //     return res.status(404).json({ message: 'Song not found in playlist' });
        // }
        // playlist.songs.splice(songIndex, 1);
        // await playlist.save();

        const deleteSong = await Playlist.updateOne({ _id: playlistId }, { $set: { songId: null } });
        res.status(200).json({ message: 'Song deleted from playlist' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting song from playlist' });
    }
});

module.exports = router;