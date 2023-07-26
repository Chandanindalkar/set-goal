const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 6000; 

const app = express();

app.get('/', (req, res) => {
    res.send('hellow frontend');
});

console.log(port)

app.listen(port, () => console.log(`app listening on port ${port}`))