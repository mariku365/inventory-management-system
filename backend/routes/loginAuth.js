const express = require('express');
const router = express.Router();
const { sql } = require('../dbConnection');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) =>{
    const { username, password } = req.body;
    try{
        const result = await sql.query(`SELECT * FROM users WHERE password = ${username} and userPassword = ${password}`)
        if (result.recordset.length > 0){
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr'});
        } else {
            res.status(401).send('Invalid credentials. Please try again.')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }

})