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
        ]
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
                'name',
                'max_guests',
                'available'
            ]
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
                res.json(err);
            }

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
        ]
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
                'name',
                'max_guests',
                'available'
            ],
            limit: 1
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
                res.json(err);
            }

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
        ]
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            name: req.body.name,
            max_guests: (req.body.max_guests) ? req.body.max_guests : null,
            available: req.body.available
        };

        // create record
        models.rooms.create(form).then((data) => {
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
 * @return Rooms
 */
routes.push({
    meta: {
        name: 'roomUpdate',
        method: 'PUT',
        paths: [
            '/room/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            currency: req.body.currency,
            price_night: req.body.price_night,
            type: req.body.type,
            name: req.body.name,
            max_guests: (req.body.max_guests) ? req.body.max_guests : null,
            available: req.body.available
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
