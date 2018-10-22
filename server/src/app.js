const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Acceso
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    next();
});

// Routes
require('./routes/vetRoutes')(app);

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});

// API REST con node js  y mysql