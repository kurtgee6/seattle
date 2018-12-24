

var path = require('path');

module.exports = function (app) {

    //sends the user the home.html file 
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.get('/user-form', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/form.html'));
    });

    app.get('/user-created', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/user-created.html'));
    });

    app.get('/get-cluster', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/get-cluster.html'));
    });

    app.get('/email-error', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/email-error.html'));
    });

};