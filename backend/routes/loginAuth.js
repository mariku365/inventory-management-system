const express = require('express');
const router = express.Router();
const { sql, connectDB } = require('../dbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginAttempts = {}

router.post('/login', async (req, res) =>{
    const { username, password } = req.body;

    const attempts = loginAttempts[username] || { count: 0, lastAttempt: null};

    if (attempts.count >= 3 && Date.now() - attempts.lastAttempt < 2 * 60 * 1000){
        return res.status(429).json({success: false, message: 'Too many failed attempts. Please try again after 2 minutes.'});
    }

    try{
        const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
        if (result.recordset.length === 0){
            loginAttempts[username] = { count: attempts.count + 1, lastAttempt: Date.now()};
            return res.status(401).json({success: false, message: 'Invalid credentials. Please try again.'});
        };

        const user = result.recordset[0];
        const match = password === user.userPassword;

        if (!match) {
            loginAttempts[username] = { count: attempts.count + 1, lastAttempt: Date.now()};
            return res.status(401).json({success: false, message: 'Invalid credentials. Please try again.'});
        };

        loginAttempts[username] = { count: 0, lastAttempt: null};

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr'});
        
        res.json({
            success: true, 
            message:`Login successful! Welcome, ${username}`, 
            token
        });
    } catch (err) {
        res.status(500).send(err.message)
    }

})

module.exports = router;