
require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

const app = server.getApp();

module.exports = app;
