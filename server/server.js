const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const port = 3001

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'argonaute'
})

// Autorise la requete Front -> Back
app.use(cors());
app.use(express.json());

// CRUD | Create 
app.post('/create', (req, res) => {
    const name = req.body.name;

    db.query('INSERT INTO argonautes (name) VALUES (?)', name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Inserted');
        }
    })
})

// CRUD | Show
app.get('/show', (req, res) => {
    db.query("SELECT * FROM argonautes", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// CRUD | Update


// CRUD | Delete
app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM argonautes WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})



// App server
app.listen(port, () => {
    console.log(`Server Connected | Port used : ${port}`)
})