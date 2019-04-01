const express = require("express");
const http = require("http");

const app = express();

const PORT = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`🌎  Server listening on port ${PORT}`));