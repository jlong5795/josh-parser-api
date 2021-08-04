const express = require('express');
const cors = require('cors');
const router = require('./router');

const server = express();

let whitelist = ['https://optimistic-torvalds-d28ab6.netlify.app/', 'https://netlify.app/']
let corsOptions = {
    origin: whitelist
}

// middleware
server.use(express.json());
server.use(cors(corsOptions));

// routes
server.use('/data', router);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
})

module.exports = server;