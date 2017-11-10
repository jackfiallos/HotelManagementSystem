const errors = require('restify-errors');
const jwt = require('jsonwebtoken');
const unless = require('express-unless');

module.exports = function(options) {
    if (!options || !options.cert) throw new Error('Cert should be set');

    const middleware = function(req, res, next) {
        let token;

        // verify options request
        if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
            const hasAuthInAccessControl = !!~req.headers['access-control-request-headers'].split(',').map((header) => {
                    return header.trim();
                }).indexOf('authorization');

            if (hasAuthInAccessControl) {
                return next();
            }
        }

        // verify is authorization header exist
        if (req.headers.hasOwnProperty('authorization')) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length == 2) {
                const scheme = parts[0];
                const credentials = parts[1];

                // verify if bearer keyword is present
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                } else {
                    return next(new errors.NotAuthorizedError({
                        message: 'Send a valid token using Authorization: Bearer [token]'
                    }));
                }
            } else {
                return next(new errors.NotAuthorizedError({
                    message: 'Send a valid token using Authorization: Bearer [token]'
                }));
            }

            try {
                // const options = {
                //     algorithm: 'HS256',
                //     audience: nconf.get('Jwt:audience'),
                //     issuer: nconf.get('Jwt:issuer'),
                //     jwtid: nconf.get('Jwt:jwtid'),
                //     subject: nconf.get('Jwt:subject')
                // };

                return jwt.verify(token, options.cert, options, (err, decoded) => {
                    if (err) {
                        return next(new errors.NotAuthorizedError({
                            message: 'Invalid token'
                        }));
                    }

                    res.uid = decoded.user.uid;

                    return next();
                });
            } catch (err) {
                return next(new errors.NotAuthorizedError({
                    message: 'Invalid token'
                }));
            }
        } else {
            return next(new errors.NotAuthorizedError({
                message: 'Authorization header is required'
            }));
        }
    }

    middleware.unless = unless;

    return middleware;
}
