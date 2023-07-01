const rateLimit = require('express-rate-limit');
const ipBlock = require('express-ip-block');

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per window
    message: 'Too many requests from this IP, please try again later.',
});

// IP Blocking Middleware
const blockedIPs = ['127.0.0.1', '192.168.0.1']; // Example of blocked IPs

const blockIP = ipBlock({
    ips: blockedIPs,
    errorMessage: 'Your IP address is not allowed to access this resource.',
});

module.exports = {
    limiter,
    blockIP,
};
