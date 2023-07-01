const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'app.log');

const loggingMiddleware = (req, res, next) => {
    const { method, url, body, params, query, headers, ip } = req;

    const logMessage = `
    Method: ${method}
    URL: ${url}
    Body: ${JSON.stringify(body)}
    Params: ${JSON.stringify(params)}
    Query: ${JSON.stringify(query)}
    Headers: ${JSON.stringify(headers)}
    IP: ${ip}
    Timestamp: ${new Date().toISOString()}
    --------------------------------------------------
  `;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    next();
};

module.exports = loggingMiddleware;
