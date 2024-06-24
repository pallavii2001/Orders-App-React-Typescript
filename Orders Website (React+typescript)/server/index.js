require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');


const order  =require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/',order)


const connectDB = require('./utils/db');
connectDB();

app.listen(3005, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port 3005');
    }
});

app.get('/', (req, res) => {
    res.send('hello world');
});