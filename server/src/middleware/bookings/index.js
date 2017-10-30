'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
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
        models.bookings.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'checkin',
                'checkout',
                'currency',
                'amount',
                'room_id',
                'guest_id'
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
        models.bookings.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'checkin',
                'checkout',
                'currency',
                'amount',
                'breakfast',
                'nights',
                'adults',
                'children',
                'comments',
                'room_id',
                'guest_id',
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
            checkin: new Date(req.body.checkin),
            checkout: new Date(req.body.checkout),
            currency: req.body.currency,
            amount: req.body.amount, // calculated
            breakfast: req.body.breakfast,
            nights: req.body.nights,
            adults: req.body.adults,
            children: req.body.children,
            comments: (req.body.comments) ? req.body.comments : null,
            room_id: (req.body.room_id) ? req.body.room_id : null,
            guest_id: req.body.guest_id,
            user_id: req.body.user_id
        };

        // create record
        models.bookings.create(form).then((data) => {
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
            breakfast: req.body.breakfast,
            adults: req.body.adults,
            children: req.body.children,
            comments: (req.body.comments) ? req.body.comments : null,
            room_id: req.body.room_id
        };

        // update record
        models.bookings.find({
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
