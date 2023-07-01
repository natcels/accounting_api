
const https = require('https');
const fs = require('fs');
const app = require("./../app");


const secureServerOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
};
const SecureServer = https.createServer(secureServerOptions, app);

function startServer() {
    const port = process.env.SECURE_PORT || 5500;
    SecureServer.listen(port, () => {
        console.log("Secure server started on port:", port);
    });

}

function closeConnections() {
    SecureServer.closeAllConnections();
}

module.exports = {
    startServer,
    closeConnections
}

