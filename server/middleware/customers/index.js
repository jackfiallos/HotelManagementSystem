'use strict';

const Sequelize = require('sequelize');
const Customers = require('../../src/models/customers.js')

const routes = [];

routes.push({
    meta: {
        name: 'customerList',
        method: 'GET',
        paths: [
            '/customer'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Customers.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'first_name',
                'last_name',
                'phone',
                'mobile',
                'city',
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
        name: 'customerRead',
        method: 'GET',
        paths: [
            '/customer/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Customers.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'first_name',
                'last_name',
                'phone',
                'mobile',
                'city',
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
        name: 'customerCreate',
        method: 'POST',
        paths: [
            '/customer'
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
        name: 'customerUpdate',
        method: 'PUT',
        paths: [
            '/customer/:id'
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
