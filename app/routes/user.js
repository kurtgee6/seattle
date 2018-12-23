
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool ({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port : '3306',
    database : 'seattle'
});

// connection
function getConnection() {
    return pool
}

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      } 
      res.json(rows)
    })
  });

// adding new users to database
// posting new users to /user-create
router.post("/user-create", (req, res) => {

    const fullName = req.body.create_full_name;
    const position = req.body.create_position;
    const company = req.body.create_company;
    const email = req.body.create_email;

    const queryString = "INSERT INTO users (full_name, position, company, email) VALUES (?, ?, ?, ?)";
    
    getConnection().query(queryString, [fullName, position, company, email], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err);
            res.sendStatus(500);
            return
        } 

        console.log("Inserted new user with id: " + results.insertId);
        res.redirect('/user-created');        
    });
    

});


module.exports = router;