
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./app/routes/user.js');
const getClusters = require('./app/routes/get-cluster.js');

// used for debugging purposes
app.use(morgan('short'));
// able to view static files
app.use(express.static('app/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

//gets the HTML file stored in htmlRoute.js so users sees display
require('./app/routes/htmlRoutes.js')(app);
// route to creating users 
app.use(users);
app.use(getClusters);

// listening on port 
app.listen('1111', () => {
    console.log('Server started on port 1111');
});