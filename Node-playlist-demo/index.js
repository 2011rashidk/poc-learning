const mongoose = require('mongoose');
const music = require('./routes/musicroute');
const express = require('express');
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/music')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/music', music);


const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));