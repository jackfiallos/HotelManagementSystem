'use strict';

const Sequelize = require('sequelize');
const Cancellations = require('../../src/models/cancellations.js')

const routes = [];

routes.push({
    meta: {
        name: 'cancelationList',
        method: 'GET',
        paths: [
            '/cancelation'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Cancellations.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'booking_id',
                'room_id',
                'customer_id',
                'user_id'
            ]
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

routes.push({
    meta: {
        name: 'cancelationRead',
        method: 'GET',
        paths: [
            '/cancelation/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Cancellations.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'booking_id',
                'room_id',
                'customer_id',
                'user_id'
            ],
            limit: 1,
            raw: true
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

routes.push({
    meta: {
        name: 'cancelationCreate',
        method: 'POST',
        paths: [
            '/cancelation'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        res.send(req.body);
        return next();
    }
});

routes.push({
    meta: {
        name: 'cancelationUpdate',
        method: 'PUT',
        paths: [
            '/cancelation/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        res.send({
            id: req.params.id,
            req: req.body,
        });
        return next();
    }
});

module.exports = routes;
