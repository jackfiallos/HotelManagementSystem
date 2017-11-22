'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const paymentSchema = require('../../dao/payment');
const Joi = require('joi');
const routes = [];

/**
 * @action list
 * @method get
 * @return Payments[]
 */
routes.push({
    meta: {
        name: 'paymentsList',
        method: 'GET',
        paths: [
            '/payments'
        ]
    },
    middleware: (req, res, next) => {
        models.payments.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                'id',
                'created_at',
                'amount',
                'method',
                'currency'
            ],
            include: [{
                model: models.users,
                as: 'user',
                required: true
            }],
        }).then((data) => {
            const resObj = data.map((payment) => {
                // tidy up the user data
                return Object.assign({}, {
                    uid: payment.id,
                    created_at: payment.created_at,
                    amount: payment.amount,
                    method: payment.method,
                    currency: payment.currency,
                    booking_id: payment.booking_id,
                    user: Object.assign({}, {
                        uid: payment.user.id,
                        name: payment.user.name,
                        lastname: payment.user.lastname
                    })
                });
            });
            res.json(resObj);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json(err);
            }

            return next();
        });;
    }
});

/**
 * @action read
 * @method get
 * @param id
 * @return Payments
 */
routes.push({
    meta: {
        name: 'paymentsRead',
        method: 'GET',
        paths: [
            '/payments/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.payments.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            include: [{
                model: models.users,
                as: 'user',
                required: true
            }, {
                model: models.bookings,
                as: 'booking',
                required: true
            }],
            limit: 1
        }).then((payment) => {
            const resObj = Object.assign({}, {
                uid: payment.id,
                created_at: payment.created_at,
                amount: payment.amount,
                method: payment.method,
                currency: payment.currency,
                booking_id: payment.booking_id,
                comments: payment.comments,
                user: Object.assign({}, {
                    uid: payment.user.id,
                    name: payment.user.name,
                    lastname: payment.user.lastname
                }),
                booking: Object.assign({}, {
                    uid: payment.booking.id
                })
            });
            res.json(resObj);
            return next();
        }).catch((err) => {
            res.status(400);
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json(err);
            }

            return next();
        });;
    }
});

/**
 * @action create
 * @method post
 * @return Payments
 */
routes.push({
    meta: {
        name: 'paymentsCreate',
        method: 'POST',
        paths: [
            '/payments'
        ]
    },
    validate: (req, res, next) => {
        // object
        const form = {
            amount: (req.body && req.body.amount) ? req.body.amount : null,
            method: (req.body && req.body.method) ? req.body.method : null,
            currency: (req.body && req.body.currency) ? req.body.currency : null,
            booking_id: (req.body && req.body.booking_id) ? req.body.booking_id : null
        };

        const result = Joi.validate(form, paymentSchema, {
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
                    name: 'paymentCreationFailed',
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
            amount: req.body.amount,
            method: req.body.method,
            currency: req.body.currency,
            booking_id: req.body.booking_id,
            user_id: res.uid
        };

        // create record
        models.payments.create(form).then((data) => {
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
 * @action update
 * @method put
 * @param id
 * @return Payments
 */
routes.push({
    meta: {
        name: 'paymentsUpdate',
        method: 'PUT',
        paths: [
            '/payments/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            amount: req.body.amount,
            method: req.body.method,
            currency: req.body.currency,
            booking_id: req.body.booking_id
        };

        // update record
        models.payments.find({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            }
        }).then(data => {
            return data.updateAttributes(form);
        }).then((data) => {
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

module.exports = routes;
