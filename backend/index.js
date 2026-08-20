require('dotenv').config();

const authenticateToken = require("./authMiddleware");
const express = require('express');
const { connectDB } = require('./dbConnection');

const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.DB_PORT, () => 
    console.log('Backend is listening in port', process.env.DB_PORT)
);

const loginRouter = require('./routes/loginAuth');
app.use('/api', loginRouter);

const itemsRouter = require('./routes/items');
app.use('/api/items', authenticateToken, itemsRouter );



