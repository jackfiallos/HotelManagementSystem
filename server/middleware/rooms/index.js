'use strict';

const Sequelize = require('sequelize');
const Rooms = require('../../src/models/rooms.js')

const routes = [];

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
        Rooms.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'price_night',
                'type',
                'max_persons'
            ]
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

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
        Rooms.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'price_night',
                'type',
                'max_persons'
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
        name: 'roomCreate',
        method: 'POST',
        paths: [
            '/room'
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
        name: 'roomUpdate',
        method: 'PUT',
        paths: [
            '/room/:id'
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
