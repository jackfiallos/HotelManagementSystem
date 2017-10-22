'use strict';

const Sequelize = require('sequelize');
const Users = require('../../src/models/users.js')

const routes = [];

routes.push({
    meta: {
        name: 'userList',
        method: 'GET',
        paths: [
            '/user'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Users.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type'
            ]
        }).then((data) => {
            res.send(data);

            return next();
        });
    }
});

routes.push({
    meta: {
        name: 'userRead',
        method: 'GET',
        paths: [
            '/user/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Users.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type'
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
        name: 'userCreate',
        method: 'POST',
        paths: [
            '/user'
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
        name: 'userUpdate',
        method: 'PUT',
        paths: [
            '/user/:id'
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
