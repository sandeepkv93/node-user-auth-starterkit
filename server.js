#!/usr/bin/env node

var app = require('./app');
var debug = require('debug')('doctor-helper:server');
var http = require('http');
const { connectToDB, disconnectFromDB } = require('./config/db');
const { Console } = require('console');

const normalizePort = (val) => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server is listening at port: ' + addr.port);
};

const handleShutdown = (signal) => {
    console.log('got %s, starting shutdown', signal);
    if (!server.listening) {
        process.exit(0);
    }
    disconnectFromDB()
        .then(() => {
            console.log("Disconnected from Mongoose");
            server.close(err => {
                if (err) {
                    console.error(err)
                    return process.exit(1)
                }
                console.log('exiting')
                process.exit(0)
            })
        });
}

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

connectToDB()
    .then(() => {
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
    });

// Graceful shutdowns
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
process.on('SIGHUP', handleShutdown);