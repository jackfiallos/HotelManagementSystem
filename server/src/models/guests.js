'use strict';

const Sequelize = require('sequelize');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Guests = sequelize.define('guests', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        phone: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        mobile: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        city: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        country: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            }
        },
        organization: {
            type: Sequelize.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5, 50]
            }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        gender: {
            type: Sequelize.ENUM(),
            values: ['M', 'F']
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Users,
                key: 'id',
            }
        }
    });

    return Guests;
};
