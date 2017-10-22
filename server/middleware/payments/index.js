'use strict';

const Sequelize = require('sequelize');
const Payments = require('../../src/models/payments.js')

const routes = [];

routes.push({
    meta: {
        name: 'paymentsList',
        method: 'GET',
        paths: [
            '/payments'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Payments.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'amount',
                'method',
                'currency'
            ]
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

routes.push({
    meta: {
        name: 'paymentsRead',
        method: 'GET',
        paths: [
            '/payments/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Payments.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'amount',
                'method',
                'currency'
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
        name: 'paymentsCreate',
        method: 'POST',
        paths: [
            '/payments'
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
        name: 'paymentsUpdate',
        method: 'PUT',
        paths: [
            '/payments/:id'
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
