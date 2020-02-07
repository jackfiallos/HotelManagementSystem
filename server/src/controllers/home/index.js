'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const errors = require('restify-errors');
const Joi = require('joi');
const models = require('../../models');
const env = process.env.NODE_ENV || 'development';
const userSchema = require('../../dao/user');

// Read configuration file
const nconf = require('nconf').file({
    file: path.join(__dirname, '..', '..', 'config', `${env}.config.json`)
});

// sign with RSA SHA256
const cert = fs.readFileSync(path.join(__dirname, '../../../', nconf.get('key:path')));

/**
 * Routes
 */

const routes = [];

/**
 * GET /
 */
routes.push({
    meta: {
        name: 'homeGet',
        method: 'GET',
        paths: [
            '/'
        ]
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
 */
routes.push({
    meta: {
        name: 'homePost',
        method: 'POST',
        paths: [
            '/'
        ]
    },
    middleware: (req, res, next) => {
        const username = (req.body && req.body.username) ? req.body.username : null;
        const password = (req.body && req.body.password) ? req.body.password : null;

        if (username && password) {
            // find specific record
            models.users.findOne({
                where: {
                    username: username,
                    active: 1
                },
                attributes: [
                    ['id', 'uid'],
                    'username',
                    'password'
                ],
                limit: 1
            }).then((user) => {
                if (user && passwordHash.verify(password, user.password)) {
                    const token = jwt.sign({
                        user: user
                    }, cert, {
                        expiresIn: 1440,
                        algorithm: 'HS256',
                        audience: nconf.get('jwt:audience'),
                        issuer: nconf.get('jwt:issuer'),
                        jwtid: nconf.get('jwt:jwtid'),
                        subject: nconf.get('jwt:subject')
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
 * POST /register
 */
routes.push({
    meta: {
        name: 'registerPost',
        method: 'POST',
        paths: [
            '/register'
        ]
    },
    validate: (req, res, next) => {
        // object
        const form = {
            name: (req.body && req.body.name) ? req.body.name : null,
            lastname: (req.body && req.body.lastname) ? req.body.lastname : null,
            username: (req.body && req.body.username) ? req.body.username : null,
            password: (req.body && req.body.password) ? req.body.password : null,
            type: (req.body && req.body.type) ? req.body.type : null
        };

        const result = Joi.validate(form, userSchema, {
            allowUnknown: false, // return an error if body has an unrecognised property
            abortEarly: false // return all errors a payload contains, not just the first one Joi finds
        }, (err, value) => {
            if (err) {
                const fail = err.details.map((item) => {
                    return {
                        message: item.message,
                        path: item.path
                    }
                });

                res.status(400);
                res.json({
                    name: 'RegistrationFailed',
                    message: 'Verify the following fields',
                    code: 'validation_failed',
                    status: 400,
                    errors: fail
                });
                return;
            } else {
                next();
            }
        });
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: passwordHash.generate(req.body.password),
            type: req.body.type
        };

        // create record
        models.users.create(form).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json({
                    errors: [{
                        message: err.message
                    }]
                });
            }

            return next();
        });
    }
});

/**
* Export
*/
module.exports = routes;
