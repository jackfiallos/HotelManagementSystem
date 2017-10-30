'use strict';

/**
 * Preflight-checks
 */

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

/**
 * Module dependencies.
 */

const path = require('path');
const restify = require('restify');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const Sequelize = require('sequelize');
const corsMiddleware = require('restify-cors-middleware');

const nconf = require('nconf').file({
    file: path.join(__dirname, 'src', 'config', `${process.env.NODE_ENV}.config.json`)
});

const formatOut = bformat({
    outputMode: 'long',
    color: true
});

/**
 * Logging
 */

const Logger = bunyan.createLogger({
    name: nconf.get('Logging:Name'),
    serializers: bunyan.stdSerializers,
    streams: [{
        level: 'info',
        stream: formatOut
    }, {
        level: 'error',
        path: path.join(nconf.get('Logging:Dir'), `${process.env.NODE_ENV}-${nconf.get('Server:Name')}.log`)
    }]
});

/**
 * Server
 */

const server = restify.createServer({
    name: nconf.get('Server:Name'),
    version: nconf.get('Server:DefaultVersion'),
    acceptable: nconf.get('Server:Acceptable'),
    log: Logger
});

/**
 * Server plugins
 */

const throttleOptions = {
    rate: nconf.get('Server:ThrottleRate'),
    burst: nconf.get('Server:ThrottleBurst'),
    ip: false,
    username: true
};

const plugins = [
    restify.plugins.acceptParser(server.acceptable),
    restify.plugins.throttle(throttleOptions),
    restify.plugins.dateParser(),
    restify.plugins.queryParser(),
    restify.plugins.fullResponse(),
    restify.plugins.bodyParser(),
    restify.plugins.gzipResponse()
];

server.use(plugins);

/**
 * CORS
 */

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);

// Inject extra header response
server.use((req, res, next) => {
    res.header('API-RND', Math.floor(Date.now() / 1000));
    return next();
});

// // Verify through middleware if user is authorized
// server.use((req, res, next) => {
//     if (req.session.auth || req.path === '/auth') {
//         next();
//     } else {
//        res.redirect('/');
//     }
// });

/**
 * Request / Response Logging
 */

server.on('after', (req, res, err, next) => {
    restify.plugins.auditLogger({
        event: 'after',
        log: Logger
    });
});

server.on('restifyError', (req, res, err, next) => {
    Logger.error({
        err: err.body,
        headers: req.headers,
        method: req.method
    });
    next();
});

/**
 * Middleware
 */

const registerRoute = (route) => {
    const routeMethod = route.meta.method.toLowerCase();
    const routeName = route.meta.name;
    const routeVersion = route.meta.version;

    route
        .meta
        .paths
        .forEach((aPath) => {
            const routeMeta = {
                name: routeName,
                path: aPath,
                version: routeVersion
            };

            server[routeMethod](routeMeta, route.middleware);
        });
};

const setupMiddleware = (middlewareName) => {
    const routes = require(path.join(__dirname, 'src', 'middleware', middlewareName));
    routes.forEach(registerRoute);
};

// setup middleware
[
    'bookings',
    'cancellations',
    'guests',
    'home',
    'payments',
    'rooms',
    'users',
    'services'
].forEach(setupMiddleware);

/**
 * Listen
 */

const listen = (done) => {
    server.listen(nconf.get('Server:Port'), () => {
        if (done) {
            return done();
        }

        Logger.info('%s now listening on %s', nconf.get('App:Name'), server.url);
    });
};

if (!module.parent) {
    listen();
}

/**
 * Export
 */

module.exports.listen = listen;
