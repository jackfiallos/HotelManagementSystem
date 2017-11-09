'use strict';

const Sequelize = require('sequelize');
const models = require('../../models');
const routes = [];

/**
 * @action list
 * @method get
 * @return Users[]
 */
routes.push({
    meta: {
        name: 'userList',
        method: 'GET',
        paths: [
            '/user'
        ]
    },
    middleware: (req, res, next) => {
        models.users.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type',
                'active'
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
 * @return Users
 */
routes.push({
    meta: {
        name: 'userRead',
        method: 'GET',
        paths: [
            '/user/:id'
        ]
    },
    middleware: (req, res, next) => {
        models.users.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type',
                'active'
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
 * @return Users
 */
routes.push({
    meta: {
        name: 'userCreate',
        method: 'POST',
        paths: [
            '/user'
        ]
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            name: req.body.name,
            password: req.body.password,
            type: req.body.type,
            active: req.body.active
        };

        // create record
        models.users.create(form).then((data) => {
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
 * @return Users
 */
routes.push({
    meta: {
        name: 'userUpdate',
        method: 'PUT',
        paths: [
            '/user/:id'
        ]
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            name: req.body.name,
            password: req.body.password,
            type: req.body.type,
            active: req.body.active
        };

        // update record
        models.users.find({
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
