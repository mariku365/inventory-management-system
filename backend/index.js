require('dotenv').config();

const authenticateToken = require("./authMiddleware");

const express = require('express');
const { sql, connectDB } = require('./dbConnection');


const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.DB_PORT, () => console.log('Backend is listening in port', process.env.DB_PORT));

const itemsRouter = require('./routes/items');
app.use('/items', authenticateToken, itemsRouter );

const loginRouter = require('./routes/loginAuth');
app.use('/api', loginRouter);

app.get('/test-db', async (req, res) => {
  try {
    const result = await sql.query`SELECT TOP 1 * FROM users`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('❌ DB connection failed: ' + err.message);
  }
});
