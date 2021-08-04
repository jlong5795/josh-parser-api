const express = require('express');
const cors = require('cors');
const router = require('./router');

const server = express();

// middleware
server.use(express.json());
server.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

// routes
server.use('/data', router);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
})

module.exports = server;