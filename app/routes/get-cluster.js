
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var http = require('http');

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

router.post("/get-user-cluster", (req, res) => {
    const email = req.body.check_email;
    var retrivedEmail;
    var availCluster;

    const queryEmail = 'SELECT * FROM users WHERE email = ?';
    const queryAvailableCluster = 'SELECT * FROM clusters WHERE clusters_email IS NULL LIMIT 1';
    const querySetEmailCluster = "UPDATE clusters SET clusters_email = ? WHERE id = ? ";

    getConnection().query(queryEmail, [email], (err, data, fields) => {

        try {
            if (err) {
                console.log("Failed to query for user email: " + err)
                return
            } 

            retrivedEmail = data[0].email;

            getConnection().query(queryAvailableCluster, (err, data, fields) => {
                if (err) {
                    console.log("Failed to query for available cluster: " + err)
                    return
                } 

                availCluster = data[0].id;

                getConnection().query(querySetEmailCluster, [retrivedEmail, availCluster], (err, data, fields) => {
                    if (err) {
                        console.log("Failed to query for assigning user email to available cluster: " + err)
                        return
                    } 

                });

            });
            res.end()
        }

        catch(err) {
            console.log('catch');
            return res.redirect('/email-error');
        }

    })
});

module.exports = router;