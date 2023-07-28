const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 6000;

const goalRoutes = require('./routes/goalRoutes');

const app = express();

app.get('/', (req, res) => {
    res.send('hellow frontend');
});

app.use('/api/goals', require('./routes/goalRoutes'));

// app.get('/api/goals', (req, res) => {
//     res.json({message: 'Get goals'});
// });

// app.get('/api/goals', (req, res) => {
//     res.json({message: 'Get goals'});
// });

// app.get('/api/goals', (req, res) => {
//     res.json({message: 'Get goals'});
// });

app.listen(port, () => console.log(`app listening on port ${port}`))