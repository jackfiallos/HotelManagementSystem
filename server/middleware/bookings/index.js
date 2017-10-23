'use strict';

const Sequelize = require('sequelize');
const Bookings = require('../../src/models/bookings.js')
const routes = [];

/**
 * @action list
 * @method get
 * @return Booking[]
 */
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
        // find records
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
            res.json(data);
            return next();
        });
    }
});

/**
 * @action read
 * @method get
 * @param id
 * @return Booking
 */
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
        // find specific record
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
                'breakfast',
                'nights',
                'adults',
                'children',
                'comments',
                'room_id',
                'customer_id',
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
 * @return Booking
 */
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
        // object
        const form = {
            arrival: new Date(req.body.arrival),
            departure: new Date(req.body.departure),
            checkin: (req.body.checkin) ? req.body.checkin : null,
            checkout: (req.body.checkout) ? req.body.checkout : null,
            breakfast: req.body.breakfast,
            nights: req.body.nights,
            adults: req.body.adults,
            children: req.body.children,
            comments: (req.body.comments) ? req.body.comments : null,
            room_id: req.body.room_id,
            customer_id: req.body.customer_id,
            user_id: req.body.user_id
        };

        // create record
        Bookings.create(form).then((data) => {
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
 * @return Booking
 */
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
        const id = req.params.id;
        // object
        const form = {
            arrival: new Date(req.body.arrival),
            departure: new Date(req.body.departure),
            checkin: (req.body.checkin) ? req.body.checkin : null,
            checkout: (req.body.checkout) ? req.body.checkout : null,
            breakfast: req.body.breakfast,
            nights: req.body.nights,
            adults: req.body.adults,
            children: req.body.children,
            comments: (req.body.comments) ? req.body.comments : null,
            room_id: req.body.room_id,
            customer_id: req.body.customer_id
        };

        // update record
        Bookings.find({
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
