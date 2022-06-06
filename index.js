
require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();

const app = server.getApp();

module.exports = app;
