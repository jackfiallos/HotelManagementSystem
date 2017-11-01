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
            include: [{
                model: models.rooms,
                as: 'room',
                required: true
            }, {
                model: models.guests,
                as: 'guest',
                required: true
            }, {
                model: models.users,
                as: 'user',
                required: true
            }],
        }).then((data) => {
            const resObj = data.map((booking) => {
                // tidy up the user data
                return Object.assign({}, {
                    uid: booking.id,
                    created_at: booking.created_at,
                    checkin: booking.checkin,
                    checkout: booking.checkout,
                    currency: booking.currency,
                    amount: booking.amount,
                    room: Object.assign({}, {
                        uid: booking.room.id,
                        name: booking.room.name,
                        currency: booking.room.currency,
                        price_night: booking.room.price_night,
                        type: booking.room.type,
                        max_persons: booking.room.max_persons
                    }),
                    guest: Object.assign({}, {
                        uid: booking.guest.id,
                        first_name: booking.guest.first_name,
                        last_name: booking.guest.last_name,
                        mobile: booking.guest.mobile,
                        email: booking.guest.email
                    }),
                    user: Object.assign({}, {
                        uid: booking.user.id,
                        name: booking.user.name
                    })
                });
            });
            res.json(resObj);
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
            include: [{
                model: models.rooms,
                as: 'room',
                required: true
            }, {
                model: models.guests,
                as: 'guest',
                required: true
            }, {
                model: models.users,
                as: 'user',
                required: true
            }],
            limit: 1
        }).then((data) => {
            const resObj = Object.assign({}, {
                uid: data.id,
                created_at: data.created_at,
                checkin: data.checkin,
                checkout: data.checkout,
                currency: data.currency,
                amount: data.amount,
                breakfast: data.breakfast,
                nights: data.nights,
                adults: data.adults,
                children: data.children,
                comments: data.comments,
                room: Object.assign({}, {
                    uid: data.room.id,
                    name: data.room.name,
                    currency: data.room.currency,
                    price_night: data.room.price_night,
                    type: data.room.type,
                    max_persons: data.room.max_persons
                }),
                guest: Object.assign({}, {
                    uid: data.guest.id,
                    first_name: data.guest.first_name,
                    last_name: data.guest.last_name,
                    mobile: data.guest.mobile,
                    email: data.guest.email
                }),
                user: Object.assign({}, {
                    uid: data.user.id,
                    name: data.user.name
                })
            });
            res.json(resObj);
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
