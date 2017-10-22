'use strict';

const Sequelize = require('sequelize');
const Cancellations = require('../../src/models/cancellations.js')

const routes = [];

routes.push({
    meta: {
        name: 'cancellationList',
        method: 'GET',
        paths: [
            '/cancellation'
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
                'comments',
                'booking_id',
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
        name: 'cancellationRead',
        method: 'GET',
        paths: [
            '/cancellation/:id'
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
                'comments',
                'booking_id',
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
        name: 'cancellationCreate',
        method: 'POST',
        paths: [
            '/cancellation'
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
        name: 'cancellationUpdate',
        method: 'PUT',
        paths: [
            '/cancellation/:id'
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
