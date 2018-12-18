
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

function getUserCluster() {
    router.post("/get-user-cluster", (req, res) => {
    const email = req.body.check_email;

    const queryString = 'SELECT email FROM users WHERE email = ?';

    getConnection().query(queryString, [email], (err, data, fields) => {
      if (err) {
        console.log("Failed to query for user email: " + err)
        return
      } 
      
      const retrivedEmail = data[0].email;
      console.log(retrivedEmail);
      res.end();
    })
});
}

getUserCluster();

module.exports = router;