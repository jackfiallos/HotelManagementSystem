'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return Rooms[]
 */
routes.push({
    meta: {
        name: 'roomList',
        method: 'GET',
        paths: [
            '/room'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        models.rooms.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'currency',
                'price_night',
                'type',
                'max_persons'
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
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomRead',
        method: 'GET',
        paths: [
            '/room/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        models.rooms.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'currency',
                'price_night',
                'type',
                'max_persons'
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
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomCreate',
        method: 'POST',
        paths: [
            '/room'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            max_persons: (req.body.max_persons) ? req.body.max_persons : null
        };

        // create record
        models.rooms.create(form).then((data) => {
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
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomUpdate',
        method: 'PUT',
        paths: [
            '/room/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            max_persons: (req.body.max_persons) ? req.body.max_persons : null
        };

        // update record
        models.rooms.find({
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
