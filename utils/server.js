const http = require("http");
const app = require("./../app");

const server = http.createServer(app);

function startServer() {
    port = process.env.PORT || 3000
    server.listen(port);
    console.log("server started on port:", port);
}

function closeConnections() {
    server.closeAllConnections();
}

module.exports = {
    startServer,
    closeConnections
}

