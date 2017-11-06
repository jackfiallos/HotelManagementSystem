'use strict';

const Sequelize = require('sequelize');
const Bookings = require('./bookings.js');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Payments = sequelize.define('payments', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        amount: {
            type: Sequelize.DECIMAL(6,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        method: {
            type: Sequelize.ENUM(),
            values: ['cash', 'card', 'online'],
            allowNull: false,
            defaultValue: 'card',
            set(val) {
                if (val) {
                    this.setDataValue('method', val.toLowerCase());
                }
            }
        },
        currency: {
            type: Sequelize.STRING(3),
            allowNull: true,
            defaultValue: 'USD',
            validate: {
                len: [3,3]
            },
            set(val) {
                if (val) {
                    this.setDataValue('curency', val.toUpperCase());
                }
            }
        },
        source: {
            type: Sequelize.STRING(50),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        booking_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Bookings,
                key: 'id',
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            }
        }
    });

    return Payments;
};
