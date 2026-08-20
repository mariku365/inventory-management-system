require('dotenv').config();

const authenticateToken = require("./authMiddleware");
const express = require('express');
const cors = require('cors');
const { sql, connectDB } = require('./dbConnection');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

connectDB();

app.listen(process.env.DB_PORT, () => 
    console.log('Backend is listening in port', process.env.DB_PORT)
);

const loginRouter = require('./routes/loginAuth');
app.use('/api', loginRouter);

const itemsRouter = require('./routes/items');
app.use('/api/items', authenticateToken, itemsRouter );



