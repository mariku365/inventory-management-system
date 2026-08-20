const express = require('express');
const router = express.Router();
const { sql } = require("../dbConnection");

// CREATE OPERATION
router.post('/', async (req, res) => {
    const {itemName, quantity, price} = req.body;
    try {
        await sql.query`INSERT INTO items(itemName, quantity, price) VALUES(${itemName}, ${quantity}, ${price})`;
        res.status(201).send('Item added successfully!');
    } catch (err) {
        res.status(500).send(err.message)
    }

})

// READ OPERATION
router.get('/', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM items`;
        res.json(result.recordset);
    } catch (err){
        res.status(500).send(err.message)
    }
});

// UPDATE OPERATION
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {quantity, price} = req.body;
    try {
        await sql.query`UPDATE items SET quantity = ${quantity}, price = ${price} WHERE id = ${id}`;
        res.send('Item updated successfully!');
    } catch (err) {
        res.status(500).send(err.message)
    }

})

// DELETE OPERATION
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM items WHERE id = ${id}`;
        res .send('Item deleted successfully!');
    } catch (err) {
        res.status(500).send(err.message)
    }

});

module.exports = router;