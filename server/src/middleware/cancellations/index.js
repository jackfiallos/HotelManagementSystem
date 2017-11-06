'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return Cancellations[]
 */
routes.push({
    meta: {
        name: 'cancellationList',
        method: 'GET',
        paths: [
            '/cancellation'
        ]
    },
    middleware: (req, res, next) => {
        models.cancellations.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'comments',
                'booking_id',
                'user_id'
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
 * @return Cancellations
 */
routes.push({
    meta: {
        name: 'cancellationRead',
        method: 'GET',
        paths: [
            '/cancellation/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.cancellations.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'comments',
                'booking_id',
                'user_id'
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
 * @return Cancellations
 */
routes.push({
    meta: {
        name: 'cancellationCreate',
        method: 'POST',
        paths: [
            '/cancellation'
        ]
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            comments: (req.body.comments) ? req.body.comments : null,
            booking_id: req.body.booking_id,
            user_id: req.body.user_id
        };

        // create record
        models.cancellations.create(form).then((data) => {
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
 * @return Cancellations
 */
routes.push({
    meta: {
        name: 'cancellationUpdate',
        method: 'PUT',
        paths: [
            '/cancellation/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            comments: (req.body.comments) ? req.body.comments : null,
            booking_id: req.body.booking_id
        };

        // update record
        models.cancellations.find({
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
