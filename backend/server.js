const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 6000;

const app = express();

const goalRoutes = require('./routes/goalRoutes');

app.use(express.json()) //body parser
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('hellow frontend');
});

app.use('/api/goals', goalRoutes);

app.use(errorHandler)

app.listen(port, () => console.log(`app listening on port ${port}`))