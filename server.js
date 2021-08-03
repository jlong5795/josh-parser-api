const express = require('express');
const cors = require('cors');
const router = require('./router');

const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// routes
server.use('/data', router);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
})

module.exports = server;