require('dotenv').config();

const express = require('express');
const { connectDB } = require('./dbConnection');

const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.DB_PORT, () => console.log('Backend is listening in port', process.env.DB_PORT));