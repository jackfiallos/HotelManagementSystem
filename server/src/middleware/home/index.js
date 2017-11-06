'use strict';

const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const models = require('../../models');

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
        const username = (req.body && req.body.username) ? req.body.username : null;
        const password = (req.body && req.body.password) ? req.body.password : null;

        if (username && password) {
            // find specific record
            models.users.findOne({
                where: {
                    username: username
                },
                attributes: [
                    ['id', 'uid'],
                    'username',
                    'password'
                ],
                limit: 1
            }).then((user) => {
                if (passwordHash.verify(password, user.password)) {
                    const token = jwt.sign({
                        user: user
                    },
                    new Buffer('ssssh', 'base64'),
                    {
                        expiresIn: 60 * 60,
                        audience: 'urn:foo',
                        issuer: 'urn:issuer',
                        jwtid: 'jwtid',
                        subject: 'subject'
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                    return next();
                } else {
                    throw Error ('Invalid user');
                }
            }).catch((err) => {
                res.status(401);
                res.json({
                    message: err.message
                });
                return next();
            });
        } else {
            res.status(401);
            res.json({
                message: 'Login failed'
            });
            return next();
        }
    }
});

/**
* Export
*/

module.exports = routes;
