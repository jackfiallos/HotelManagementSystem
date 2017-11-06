'use strict';

const jwt = require('jsonwebtoken');

/**
 * Routes
 */

const routes = [];

/**
 * GET /
 * Version: 1.0.0
 */
routes.push({
    meta: {
        name: 'homeGet',
        method: 'GET',
        paths: [
            '/'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        res.send({
            message: 'please login'
        });

        return next();
    }
});

/**
 * POST /
 * Version: 1.0.0
 */
routes.push({
    meta: {
        name: 'homePost',
        method: 'POST',
        paths: [
            '/'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        const token = jwt.sign({
            payload: {
                foo: 'bar'
            }
        }, new Buffer('ssssh', 'base64'), {
            expiresIn: 60 * 60,
            audience: 'urn:foo',
            issuer: 'urn:issuer',
            jwtid: 'jwtid',
            subject: 'subject'
        });

        res.send({
            message: 'please login',
            token: token
        });

        return next();
    }
});

/**
* Export
*/

module.exports = routes;
