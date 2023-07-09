const rateLimit = require('express-rate-limit');
const ipBlock = require('express-ip-block');
const { BlockedIP } = require('./../models/blockedIps.model');

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per window
    message: 'Too many requests from this IP, please try again later.',
});


const blockIP = async (req, res, next) => {
    try {
        const blockedIPs = await BlockedIP.find();
        const blockedIPStrings = blockedIPs.map((ip) => ip.ip_address) || "127.0.0.1";

        const ipBlockMiddleware = ipBlock({
            ips: blockedIPStrings,
            errorMessage: 'Your IP address is not allowed to access this resource.',
        });

        //        ipBlockMiddleware(req, res, next);
        next;
    } catch (error) {
        console.error('Error fetching blocked IPs from the database:');
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    limiter,
    blockIP,
};
