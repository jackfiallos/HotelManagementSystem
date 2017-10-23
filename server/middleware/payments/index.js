'use strict';

const Sequelize = require('sequelize');
const Payments = require('../../src/models/payments.js')
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
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Payments.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'amount',
                'method',
                'currency'
            ]
        }).then((data) => {
            res.json(data);
            return next();
        });
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
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Payments.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'amount',
                'method',
                'currency'
            ],
            limit: 1,
            raw: true
        }).then((data) => {
            res.json(data);
            return next();
        });
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
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            amount: req.body.amount,
            method: req.body.method,
            currency: req.body.currency,
            source: (req.body.source) ? req.body.source : null,
            booking_id: req.body.booking_id,
            user_id: req.body.user_id
        };

        // create record
        Payments.create(form).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    message: err.message,
                    type: err.type,
                    path: err.path
                });
            } else {
                res.json(err);
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
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            amount: req.body.amount,
            method: req.body.method,
            currency: req.body.currency,
            source: (req.body.source) ? req.body.source : null,
            booking_id: req.body.booking_id
        };

        // update record
        Payments.find({
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
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    message: err.message,
                    type: err.type,
                    path: err.path
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

module.exports = routes;
