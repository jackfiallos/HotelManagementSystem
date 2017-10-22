'use strict';

const Sequelize = require('sequelize');
const Bookings = require('../../src/models/bookings.js')

const routes = [];

routes.push({
    meta: {
        name: 'bookingList',
        method: 'GET',
        paths: [
            '/booking'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Bookings.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'arrival',
                'departure',
                'checkin',
                'checkout',
                'room_id',
            ]
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

routes.push({
    meta: {
        name: 'bookingRead',
        method: 'GET',
        paths: [
            '/booking/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Bookings.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'arrival',
                'departure',
                'checkin',
                'checkout',
                'room_id',
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
        name: 'bookingCreate',
        method: 'POST',
        paths: [
            '/booking'
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
        name: 'bookingUpdate',
        method: 'PUT',
        paths: [
            '/booking/:id'
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
