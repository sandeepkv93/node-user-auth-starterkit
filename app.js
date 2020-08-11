const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const authenticationRoutes = require('./config/auth');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', (req, res) => {
    console.log('Root route');
    res.render('index', { title: 'Express' });
});

/* All the routes */
app.use('/api', routes);
app.use('/api/users', authenticationRoutes);

module.exports = app;
