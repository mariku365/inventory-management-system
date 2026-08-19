require('dotenv').config();

const express = require('express');
const { connectDB } = require('./dbConnection');


const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.DB_PORT, () => console.log('Backend is listening in port', process.env.DB_PORT));

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

const loginRouter = require('./routes/loginAuth');
app.use('/', loginRouter)