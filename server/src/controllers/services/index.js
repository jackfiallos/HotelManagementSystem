'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return Payments[]
 */
routes.push({
    meta: {
        name: 'servicesList',
        method: 'GET',
        paths: [
            '/services'
        ]
    },
    middleware: (req, res, next) => {
        models.services.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'description',
                'currency',
                'amount',
                'is_active',
                'user_id',
                'booking_id'
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
        name: 'servicesRead',
        method: 'GET',
        paths: [
            '/services/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.services.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'description',
                'currency',
                'amount',
                'is_active',
                'user_id',
                'booking_id'
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
        name: 'servicesCreate',
        method: 'POST',
        paths: [
            '/services'
        ]
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            description: req.body.description,
            currency: req.body.currency,
            amount: req.body.amount,
            booking_id: req.body.booking_id,
            user_id: req.body.user_id
        };

        // create record
        models.services.create(form).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400);
                res.json({
                    errors: err.errors,
                    name: err.name
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
        name: 'servicesUpdate',
        method: 'PUT',
        paths: [
            '/services/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            description: req.body.description,
            currency: req.body.currency,
            amount: req.body.amount
        };

        // update record
        models.services.find({
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
                res.status(400);
                res.json({
                    errors: err.errors,
                    name: err.name
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

module.exports = routes;
